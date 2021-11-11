const mongoose = require("mongoose");

var Endereco = mongoose.model('Endereco', {
    cep: {
      type: String,
      required: true
    },
    endereco: {
      type: String,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    complemento: {
      type: String
    },
    bairro: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true
    },
    pais: {
      type: String,
      required: true
    },
    login: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Login'
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    }
  })

  module.exports = Endereco