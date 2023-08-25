const express = require('express')
const router = express.Router()

//importando controllers


router.get('/', (req, res) => {
    console.log(req.body.usuario)
})

router.post('/', (req, res) => {
    console.log(`Usuário: ${req.body.usuario} Senha: ${req.body.senha}`)
})
module.exports = router