const express = require('express')
const router = express.Router()
const Login = require('../models/login')

router.post('/', async (req, res) => {
    try {

        const credenciais = req.body
        const usuario = await Login.findOne(credenciais)

        if (usuario) {
            res.json({ error: false, usuario })
        }else {
            res.json({ error: true, message: 'Nenhum usuário encontrado.' })
        }

    }catch (erro) {

        res.json({error: true, message: erro.message})

    }
})

module.exports = router