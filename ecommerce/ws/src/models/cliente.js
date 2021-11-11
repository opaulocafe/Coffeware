const mongoose = require("mongoose")

var Cliente = mongoose.model('Cliente', {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    nascimento: {
      type: String,
      required: true
    },
    genero: {
      type: String
    },
    qtdCompras: {
      type: Number,
      required: true
    },
    blog: {
      type: Boolean,
      required: true
    },
    ofertas: {
      type: String,
      required: true
    },
    culturaAlimentar: {
      type: String
    },
    restricaoAlimentar: {
      type: String
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
    customer_id: {
      type: String,
      required: true,
    },
    login: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Login'
    },
    cupom: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Cupom'
    }
  })

  module.exports = Cliente