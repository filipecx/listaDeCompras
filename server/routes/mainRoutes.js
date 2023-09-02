const express = require('express')
const mainControllers = require('../controllers/mainControllers')
const { authenticate } = require('passport')
const router = express.Router()

//importando controllers


router.get('/user',  mainControllers.getLogin)

router.post('/login', mainControllers.postLogin)

router.post('/register', mainControllers.register)

router.post('/logout', mainControllers.deslogar)

module.exports = router