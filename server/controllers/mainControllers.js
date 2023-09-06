const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    getHome: (req, res) => {
        res.render('home.ejs')
    },

    getLogin: (req, res) => {
      res.render('login.ejs')
    },
    getRegister: (req, res) => {
      res.render('register.ejs')
    },

    postLogin: function(req, res, next){
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.redirect('/');
        else {
          req.logIn(user, async (err) => {
            if (err) throw err;
            try{
              await req.session.save()
              res.redirect('/lista')
            }catch(error){
              console.log(error)
            }      
          });
        }
      })(req, res, next)
    },

    register: async function(req, res, next){
      try{
        const usuario = await User.findOne({username: req.body.username})
        if(usuario) res.send('Usuário já existe')
        if(!usuario){
          const hashedPassword = await bcrypt.hash(req.body.password, 10);       
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
          });         
          await newUser.save();
          res.redirect('/lista')
        }
      }
      catch(error){
        res.send('deu erro' + error)
      }
    },

    deslogar: async function(req, res, next){
        req.logout(function(err) {
          if(err) { return next(err)}
          res.send('saiu')
          res.redirect('/')
        })
    }
}