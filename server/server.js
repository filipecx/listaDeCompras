const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
//importa conexão ao banco de dados
const connectDB = require('./config/db')
//deita o .env pra todas as pastas
require('dotenv').config({path: './config/.env'})

//conecta ao banco de dados
connectDB()


//formatação
app.use(express.urlencoded({extended: true}))
app.use(express.json())





//importa as rotas
const mainRoutes = require('./routes/mainRoutes')
const listaRoutes = require('./routes/listaRoutes')

//utiliza as rotas do servidor
app.use('/', mainRoutes)
app.use('/lista', listaRoutes)


//prestar atenção na porta quando tiver conectado ao banco de dados
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('O servidor está funcionando')
    })
})
