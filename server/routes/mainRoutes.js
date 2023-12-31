const express = require('express')
const mainControllers = require('../controllers/mainControllers')
const { authenticate } = require('passport')
const router = express.Router()
const listaControllers = require('../controllers/listaControllers')
//importando controllers


router.get('/',  listaControllers.getLista)
router.get('/login',  mainControllers.getLogin)
router.get('/register',  mainControllers.getRegister)

router.post('/login', mainControllers.postLogin)

router.post('/register', mainControllers.register)

router.post('/logout', mainControllers.deslogar)

module.exports = router