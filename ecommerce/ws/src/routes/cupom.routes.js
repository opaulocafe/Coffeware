const express = require('express')
const router = express.Router()
const Cupom = require('../models/cupom')
const Cliente = require('../models/cliente')

router.post('/', async (req, res) => {
    try {

        const { cupom, usuario } = req.body


        let resCupom = await Cupom.findOne({ cupom: cupom.toUpperCase() })
        let resCliente = await Cliente.findOne({ login: usuario._id })

        if (resCupom.status === true) {

            if (resCupom._id.toString() !== resCliente.cupom.toString()) {

                if (resCupom.tipoCupom.primeira === false) {
                    res.json({ error: false, resCupom })
                }else {

                    if (resCliente.qtdCompras === 0) {
                        res.json({ error: false, resCupom })
                    }else {
                        res.json({ error: true, message: 'Cupom válido apenas para a primeira compra!' })
                    }

                }

            }else {
                res.json({ error: true, message: 'Não é possível utilizar o próprio cupom!' })
            }
            
        } else {
            res.json({ error: true, message: 'Nenhum cupom encontrado!' })
        }

    } catch (erro) {
        res.json({ error: true, message: 'Nenhum cupom encontrado!' })
    }
})

module.exports = router