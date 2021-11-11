const { response } = require('express')
const express = require('express')
const router = express.Router()
let mercadopago = require('mercadopago')
const Cliente = require('../models/cliente')
const Pedido = require('../models/pedido')
const config = require('../services/config.json')
mercadopago.configurations.setAccessToken(config.access_token)

router.get('/getIssuer', async (req, res) => {
    try {

        const cartao = req.body

        const buscaPagamentos = fetch('https://api.mercadopago.com/v1/payment_methods/', {
            method: "GET",
            headers: {
                "Authorization": config.access_token,
                "Content-Type": "application/json",
            }
        })

        console.log(buscaPagamentos)

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

router.post('/', async (req, res) => {
    try {

        const usuario = req.body

        const resCliente = await Cliente.findOne({ login: usuario._id })

        const resCartoes = await mercadopago.customers.cards.all(resCliente.customer_id)

        res.json({ error: false, resCartoes })


    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

router.post('/pix', async (req, res) => {
    try {

        const { usuario, valorTotal, carrinho, endereco, cupom, observacao } = req.body

        const respCliente = await Cliente.findOne({ login: usuario._id })
        const nome = respCliente.nome.split(' ')
        const amount = Number(valorTotal).toFixed(2)

        let payment_data = {
            transaction_amount: Number(amount),
            description: 'Mercado Silvestre',
            payment_method_id: 'pix',
            payer: {
                email: respCliente.email,
                first_name: nome[0],
                last_name: nome[nome.length - 1],
                identification: {
                    type: 'CPF',
                    number: respCliente.cpf
                }
            }
        }


        mercadopago.payment.create(payment_data).then(async function (data) {

            const data_pedido = new Date()
            await new Pedido({
                produtos: carrinho,
                endereco: endereco,
                cupom: cupom,
                observacao: observacao,
                login: usuario._id,
                createdAt: data_pedido,
                updatedAt: data_pedido
            }).save()

            res.json({ error: false, pix: data.response.point_of_interaction.transaction_data.qr_code })
        }).catch(function (error) {
            console.log(error)
        });

    } catch (erro) {

        res.json({ error: true, message: erro.message })

    }
})

router.post('/finalizar', async (req, res) => {
    try {

        const { cartao, usuario, total, carrinho, endereco, cupom, observacao } = req.body

        const cardToken = await mercadopago.card_token.create(cartao)
        const cliente = await Cliente.findOne({ login: usuario._id })

        let payment_data = {
            transaction_amount: Number(total),
            token: cardToken.response.id,
            installments: 1,
            payer: {
                type: "customer",
                id: cliente.customer_id
            }
        };

        const finalizaPagamento = await mercadopago.payment.create(payment_data)

        if (finalizaPagamento) {

            if (finalizaPagamento.response.status === 'approved') {

                const data = new Date()
                await new Pedido({
                    produtos: carrinho,
                    endereco: endereco,
                    cupom: cupom,
                    observacao: observacao,
                    login: usuario._id,
                    createdAt: data,
                    updatedAt: data
                }).save()

                if (!cartao.cardId) {

                    let card_data = {
                        token: cardToken.response.id,
                        customer_id: cliente.customer_id
                    }

                    mercadopago.card.create(card_data).then(function (card) {
                        res.json({ error: false, message: 'Compra finalizada com sucesso, em até 3 dias o seu pedido será entregue!' })
                    })

                } else {
                    res.json({ error: false, message: 'Compra finalizada com sucesso, em até 3 dias o seu pedido será entregue!' })
                }

            } else {
                res.json({ error: true, message: 'Infelizmente não conseguimos concluir seu pagamento no momento, tente outro meio de pagamento.' })
            }

        } else {
            res.json({ error: true, message: 'Não foi possível registrar sua compra. Tente novamente com outro cartão.' })
        }

    } catch (erro) {
        res.json({ error: true, message: erro.message })
    }
})

module.exports = router