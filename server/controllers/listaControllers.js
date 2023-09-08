const Item = require('../models/Item')

module.exports = {
    getLista: async (req, res) => {
        try{
            const item = await Item.find({autor: req.user})
            res.json(item)
        }catch(error){          
            console.log(error)
        }
    },

    adicionarItem: async (req, res) => {
        console.log(req.user)
        const novoItem = new Item({
            titulo: req.body.titulo,
            autor: req.user,
            completo: 'false'
        })  
        await novoItem.save()
        console.log('o usuario: ' + req.user)
        res.redirect('/lista')
    },

    deletarItem: async (req, res) => {
        try{
            await Item.deleteOne({_id: req.body.id})
            res.json('Item deletado')
        }catch(error){
            console.log(error)
        }
    },
    completarItem: async (req, res) => {
        try{
            await Item.findByIdAndUpdate(req.body.id, {completo: 'true'})
            res.json('Completo')
        }catch(error){
            console.log(error)
        }
    },
    incompletarItem: async (req, res) => {
        try{
            await Item.findByIdAndUpdate(req.body.itemIDFromJSFile, {completo: 'false'})
            res.json('Incompleto')
        }catch(error){
            console.log(error)
        }
    },

    finalizarLista: async (req, res) => {
        await Item.deleteMany({autor: req.user})
        res.json('Lista finalizada')
    }
}