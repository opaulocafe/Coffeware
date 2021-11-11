const express = require('express')
const router = express.Router()
const _ = require('underscore')
const Categoria = require('../models/categoria')
const Subcategoria = require('../models/subcategoria')
const Produto = require('../models/produto')

router.get('/home/:tag', async (req, res) => {
    try {

        const { tag } = req.params

        console.log(tag)
        if (tag !== 'null') {

            let categorias = await Categoria.find({}).elemMatch('tags', { $eq: tag })
            let finalCategorias = []

            // for (let categoria of categorias) {
            //     let subcategorias = await Subcategoria.find({
            //         tags: { $elemMatch: { $eq: tag } },
            //         categoria: categoria._id
            //     }).limit(2)

            //     let produtos = []
            //     for (let subcategoria of subcategorias) {
            //         let rertornoProdutos = await Produto.find({
            //             tags: { $elemMatch: { $eq: tag } },
            //             subcategoria: subcategoria._id
            //         }).limit(3)

            //         for (let produto of rertornoProdutos) {
            //             produtos.push(produto)
            //         }
            //     }

            //     const newCategoria = { ...categoria._doc, produtos }
            //     finalCategorias.push(newCategoria)

            // }

            // SEPARAR EM CATEGORIAS
            // const secoes = _.chunk(finalCategorias, 1)
            // res.json({ error: false, categorias, secoes })
            res.json({ error: false, categorias })

        } else {

            let categorias = await Categoria.find({})
            let finalCategorias = []

            for (let categoria of categorias) {
                let subcategorias = await Subcategoria.find({
                    categoria: categoria._id
                }).limit(2)

                let produtos = []
                for (let subcategoria of subcategorias) {
                    let rertornoProdutos = await Produto.find({
                        subcategoria: subcategoria._id
                    }).limit(3)

                    for (let produto of rertornoProdutos) {

                        produtos.push(produto)
                    }
                }

                const newCategoria = { ...categoria._doc, produtos }
                finalCategorias.push(newCategoria)

            }

            // SEPARAR EM CATEGORIAS
            const secoes = _.chunk(finalCategorias, 1)
            res.json({ error: false, categorias, secoes })

        }

    } catch (erro) {

        res.json({ error: true, message: erro.message })

    }
})

router.get('/search/:nome', async (req, res) => {

    try {

        const { nome } = req.params
        const palavras = nome.split(' ')

        let $and = []
        palavras.forEach(palavra => {
            $and.push({ nome: { $regex: "\.\*" + palavra + "\.\*", $options: 'i' } })
        });

        const busca = await Produto.find().and($and).limit(21)

        res.json({ error: false, busca })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
        console.log(erro.message)
    }

})

router.post('/categoria', async (req, res) => {
    try {

        const categoria = req.body

        const subcategorias = await Subcategoria.find(categoria)
        const finalProdutos = []

        for (let subcategoria of subcategorias) {
            let produtos = await Produto.find({
                subcategoria: subcategoria._id
            }).limit(6)

            const newSubcategoria = { ...subcategoria._doc, produtos }
            finalProdutos.push(newSubcategoria)
        }

        // SEPARAR EM CATEGORIAS
        const secoes = _.chunk(finalProdutos, 1)

        res.json({ error: false, secoes })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }

})

router.post('/subcategoria', async (req, res) => {
    try {
        const subcategoria = req.body

        const produtos = await Produto.find(subcategoria)

        res.json({ error: false, produtos })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

module.exports = router