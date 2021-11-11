const mongoose = require("mongoose");

var Cupom = mongoose.model('Cupom', {
    cupom: {
      type: String,
      required: true
    },
    descricao: {
      type: String
    },
    tipoCupom: {
      type: Object,
      required: true
    },
    desconto: {
      type: Number,
      required: true
    },
    utilizacoesPossiveis: {
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
    }
  })

  module.exports = Cupom