const express = require('express')
const router = express.Router()

//importando controllers


router.get('/', (req, res) => {
    res.send('Você está na tela de login')
})

module.exports = router