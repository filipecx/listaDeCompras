const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Você está visualizando a lista')
})

module.exports = router