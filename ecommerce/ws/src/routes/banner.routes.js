const express = require('express')
const router = express.Router()
const Cupom = require('../models/cupom')
const Banner = require('../models/banner')

router.get('/', async (req, res) => {
    try {

        let banners = await Banner.find({}).sort({posicaoBanner: 1})

        res.json({ error: false, banners })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

module.exports = router