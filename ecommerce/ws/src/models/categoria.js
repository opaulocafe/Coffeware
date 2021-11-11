const mongoose = require('mongoose')

var Categoria = mongoose.model('Categoria', {
    nomeCategoria: {
      type: String,
      required: true
    },
    posicaoCategoria: {
      type: Number,
      required: true
    },
    imagem: {
      type: String,
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

  module.exports = Categoria