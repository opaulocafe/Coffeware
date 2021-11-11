const mongoose = require("mongoose");

var Pedido = mongoose.model('Pedido', {
    produtos: {
        type: Object,
        required: true
    },
    endereco: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Endereco'
    },
    cupom: {
        type: String,
    },
    obsercacao: {
        type: String,
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

  module.exports = Pedido