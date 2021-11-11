const express = require('express')
const router = express.Router()
let mercadopago = require('mercadopago')
const Cliente = require('../models/cliente')
const Login = require('../models/login')
const Cupom = require('../models/cupom')
const config = require('../services/config.json')
mercadopago.configurations.setAccessToken(config.access_token)

router.post('/', async (req, res) => {
    try {

        const { celular, senha, nome, cpf, email, nascimento, genero, ofertas } = req.body

        const verificaCelular = await Cliente.findOne({ celular: celular })
        const verificaCPF = await Cliente.findOne({ cpf: cpf })
        const verificaEmail = await Cliente.findOne({ email: email })

        if (!verificaCPF && !verificaEmail && !verificaCelular) {

            const data = new Date()

            const arrayNome = nome.split(' ')
            const numeroCupom = Math.floor(Math.random() * (99999 - 10000) + 10000)
            const respCupom = await Cupom.findOne({
                cupom: arrayNome[0][0] + arrayNome[1][0] + numeroCupom
            })

            while (respCupom) {
                numeroCupom = Math.floor(Math.random() * (99999 - 10000) + 10000)
                respCupom = await Cupom.findOne({
                    cupom: arrayNome[0][0] + arrayNome[1][0] + numeroCupom
                })
            }

            const responseCupom = await new Cupom({
                cupom: arrayNome[0][0] + arrayNome[1][0] + numeroCupom,
                descricao: 'Cupom de cliente, inserido automaticamente',
                tipoCupom: { primeira: true, desconto: 'porcentagem' },
                desconto: '10',
                utilizacoesPossiveis: 0,
                status: 1,
                createdAt: data,
                updatedAt: data
            }).save()

            let responseLogin = await new Login({
                celular: celular,
                senha: senha,
                status: 1,
                createdAt: data,
                updatedAt: data
            }).save()

            const customerCreate = await mercadopago.customers.create({ "email": email })

            await new Cliente({
                nome: nome,
                cpf: cpf,
                email: email,
                nascimento: nascimento,
                genero: genero,
                qtdCompras: 0,
                blog: 0,
                ofertas: ofertas,
                createdAt: data,
                updatedAt: data,
                customer_id: customerCreate.response.id,
                login: responseLogin._id,
                cupom: responseCupom._id

            }).save()

            res.json({ error: false, responseLogin })

        } else {
            res.json({ error: true, message: 'CPF, celular ou email já cadastrados.' })
        }

    } catch (erro) {

        res.json({ error: true, message: erro.message })

    }
})

router.put('/atualizar', async (req, res) => {
    try {

        const dados = req.body

        const cliente = await Cliente.findOne({ _id: dados._id })
        const login = await Login.findOne({ _id: dados.login })

        if (cliente.nome !== dados.nome || cliente.nascimento !== dados.nascimento || cliente.genero !== dados.genero || cliente.ofertas !== dados.ofertas) {
            await Cliente.findByIdAndUpdate(dados._id, {
                nome: dados.nome,
                nascimento: dados.nascimento,
                genero: dados.genero,
                ofertas: dados.ofertas
            })
        }

        if (cliente.cpf !== dados.cpf) {

            const atualizaCPF = await Cliente.findOne({ cpf: dados.cpf })

            if (atualizaCPF) {
                res.json({ error: true, message: 'CPF já cadastrado em nosso sistema!' })
            } else {
                await Cliente.findByIdAndUpdate(dados._id, { cpf: dados.cpf })
            }

        }

        if (cliente.email !== dados.email) {

            const atualizaEmail = await Cliente.findOne({ email: dados.email })

            if (atualizaEmail) {
                res.json({ error: true, message: 'Email já cadastrado em nosso sistema!' })
            } else {
                await Cliente.findByIdAndUpdate(dados._id, { email: dados.email })
            }

        }

        if (login.celular !== dados.celular) {

            const atualizaCelular = await Login.findOne({ celular: dados.celular })

            if (atualizaCelular) {
                res.json({ error: true, message: 'Celular já cadastrado em nosso sistema!' })
            } else {
                await Login.findByIdAndUpdate(dados._id, { celular: dados.celular })
            }

        }

        const responseLogin = await Login.findOne({ _id: dados.login })
        res.json({ error: false, responseLogin })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

router.post('/pegarDados', async (req, res) => {
    try {

        const login = req.body

        const dados = await Cliente.findOne({
            login: login._id
        })

        res.json({ error: false, dados })

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

router.post('/alterarSenha', async (req, res) => {
    try {

        const { celular, senha, nome, cpf, email, nascimento } = req.body

        const verificaUsuario = await Cliente.findOne({ cpf: cpf, email: email, nome: nome, nascimento: nascimento })
        const verificaLogin = await Login.findOne({ celular: celular })

        if (verificaUsuario && verificaLogin) {

            const data = new Date()

            const responseLogin = await Login.findByIdAndUpdate(verificaLogin._id, { senha: senha, updatedAt: data })

            res.json({ error: false, responseLogin })

        } else {
            res.json({ error: true, message: 'Não encontramos os registros de sua conta no nosso sistema, caso haja algum engano, favor entrar em contato conosco.' })
        }

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

module.exports = router