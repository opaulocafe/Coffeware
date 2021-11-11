const mongoose = require('mongoose')

var Subcategoria = mongoose.model('Subcategoria', {
    posicaoSubcategoria: {
      type: Number,
      required: true
    },
    nomeSubcategoria: {
      type: String,
      required: true
    },
    imagem: {
      type: String,
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
    categoria: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Categoria'
    }
  })

  module.exports = Subcategoria