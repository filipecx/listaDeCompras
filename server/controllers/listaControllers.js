const Item = require('../models/Item')
let usuario = ''

module.exports = {
    getLista: async (req, res) => {
        const item = await Item.find({autor: `${req.user}`})
        usuario = req.user
      
        res.json(item)

    },

    adicionarItem: async (req, res) => {
        const novoItem = new Item({
            titulo: req.body.titulo,
            autor: usuario,
            completo: 'false'
        })  
        await novoItem.save()
        console.log('o usuario: ' + usuario)
        res.send('Item adicionado')
    },

    deletarItem: async (req, res) => {
        await Item.deleteOne({_id: req.params.id})
        res.send('Item deletado')
    },

    finalizarLista: async (req, res) => {
        await Item.deleteMany({autor: req.params.autor})
        res.send('Lista finalizada')
    }
}