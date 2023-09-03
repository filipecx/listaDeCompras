const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const User = require('../models/User')


module.exports = async function initialize(passport) {

  passport.use(new LocalStrategy(
    async function(username, password, done) {
      try{
        User.findOne({username: username})
        .then((usuario) => {
          if(!usuario){
            return done(null, false)
          }
          bcrypt.compare(password, usuario.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, usuario);
            } else {
              return done(null, false);
            }
          });
        })    
      }catch(error){
        
        done(error)
      }
    }
  
  ));

        
    passport.serializeUser(function(user, done) {
        done(null, user.username)
      })
    
      passport.deserializeUser((username, done) => {
        console.log('deserialized')
        try{
          User.findOne({username: username})
          .then((usuario) => {
            console.log(usuario.username)
            return done(null, usuario.username)
          })
        }catch(err){
          done(err)
        }
        
      })
    
}