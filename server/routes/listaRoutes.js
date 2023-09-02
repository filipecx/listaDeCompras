const express = require('express')
const router = express.Router()
const listaControllers = require('../controllers/listaControllers')
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, listaControllers.getLista)

router.post('/adicionarItem', listaControllers.adicionarItem)

router.delete('/deletarItem/:id', listaControllers.deletarItem)

router.delete('/finalizarLista/:autor', listaControllers.finalizarLista)

module.exports = router