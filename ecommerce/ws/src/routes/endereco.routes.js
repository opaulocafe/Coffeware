const express = require('express')
const router = express.Router()
const Endereco = require('../models/endereco')

router.post('/', async (req, res) => {
    try {

        const usuario = req.body

        let enderecos = await Endereco.find({ login: usuario._id })

        if (enderecos.length > 0) {
            res.json({ error: false, enderecos })
        } else {
            res.json({ error: true, message: 'Nenhum endereço encontrado!' })
        }

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

router.post('/cadastrar', async (req, res) => {
    try {

        const { enderecoFinal, usuario } = req.body
        const data = new Date()

        let buscarEndereco = await Endereco.find({
            cep: enderecoFinal.cep,
            endereco: enderecoFinal.endereco,
            numero: enderecoFinal.numero,
            complemento: enderecoFinal.complemento,
            bairro: enderecoFinal.bairro,
            cidade: enderecoFinal.cidade,
            estado: enderecoFinal.estado,
            pais: enderecoFinal.pais,
            login: usuario._id,
        })

        if (buscarEndereco.length === 0) {

            let cadastrar = await new Endereco({
                cep: enderecoFinal.cep,
                endereco: enderecoFinal.endereco,
                numero: enderecoFinal.numero,
                complemento: enderecoFinal.complemento,
                bairro: enderecoFinal.bairro,
                cidade: enderecoFinal.cidade,
                estado: enderecoFinal.estado,
                pais: enderecoFinal.pais,
                login: usuario._id,
                createdAt: data,
                updatedAt: data,
            }).save()

            if (cadastrar) {
                res.json({ error: false, cadastrar })
            } else {
                res.json({ error: true, message: 'Não conseguimos cadastrar seu endereço, por favor tente novamente mais tarde.' })
            }

        }else {
            res.json({ error: true, message: 'Endereço cadastrado anteriormente.' })
        }

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

module.exports = router