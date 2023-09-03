const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = {
    getLogin: (req, res) => {
        res.send(req.user)
    },

    postLogin: function(req, res, next){   
      passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, async (err) => {
            if (err) throw err;
            await req.session.save()
            res.status(200).send('ola')
            res.redirect('/user')
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
          res.send("User Created");
        }
      }
      catch(error){
        res.send('deu erro' + error)
      }
    },

    deslogar: async function(req, res, next){
        req.logout(function(err) {
          if(err) { return next(err)}
          res.send('deslogado')
        })
    }
}