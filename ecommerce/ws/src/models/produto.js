const mongoose = require('mongoose')

var Produto = mongoose.model('Produto', {
    tags: {
      type: Array
    },
    nome: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    },
    custo: {
      type: mongoose.Types.Decimal128
    },
    deValor: {
      type: mongoose.Types.Decimal128
    },
    porValor: {
      type: mongoose.Types.Decimal128,
      required: true
    },
    imagem: {
      type: String,
      required: true
    },
    estoque: {
      type: Number
    },
    vendas: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
    subcategoria: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Subcategoria'
    }
  })

  module.exports = Produto