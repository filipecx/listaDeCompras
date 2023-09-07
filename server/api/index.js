const MongoStore = require('connect-mongo')
const PORT = 3000
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("../models/User");
const mainRoutes = require('../routes/mainRoutes')
const listaRoutes = require('../routes/listaRoutes')
//importa conexão ao banco de dados
const connectDB = require('../config/db')
//deita o .env pra todas as pastas
require('dotenv').config({path: '../config/.env'})

//conecta ao banco de dados
connectDB()
app.set('view engine', 'ejs')
app.set('views', '../views')

//formatação
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//cors
app.use(cors())
//app.use(express.static("public"))
app.use("../", express.static('public'))

app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
       // store: MongoStore.create({mongoUrl: process.env.DB_STRING})
    })
  )
app.use(cookieParser(process.env.SECRET))  
app.use(passport.initialize())
app.use(passport.session())
require('../config/passport')(passport)  


//utiliza as rotas do servidor
app.use('/', mainRoutes)
app.use('/lista', listaRoutes)


//prestar atenção na porta quando tiver conectado ao banco de dados
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('O servidor está funcionando')
    })
})
