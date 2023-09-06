const express = require('express')
const router = express.Router()
const listaControllers = require('../controllers/listaControllers')
const { ensureAuth } = require('../middleware/auth')

//router.get('/', ensureAuth, listaControllers.getLista)

router.get('/', listaControllers.getLista)

router.post('/adicionarItem', listaControllers.adicionarItem)

router.delete('/deletarItem', listaControllers.deletarItem)

router.delete('/finalizarLista', listaControllers.finalizarLista)

router.put('/completarItem', listaControllers.completarItem)

router.put('/incompletarItem', listaControllers.incompletarItem)

module.exports = router