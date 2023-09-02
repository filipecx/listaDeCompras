const mongoose = require('mongoose')

const item = new mongoose.Schema({
    titulo: {type: String},
    autor: {type: String},
    completo: {type: String}
})

module.exports = mongoose.model('Item', item, 'itens')