module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            console.log('autenticado: ' + req.user)
            return next()
        }else{
            return null
        }
    }
}