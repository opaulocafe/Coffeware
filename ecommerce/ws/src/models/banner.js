const mongoose = require('mongoose')

var Banner = mongoose.model('Banner', {
    url: {
      type: String,
      required: true
    },
    posicaoBanner: {
      type: Number,
      required: true
    },
    titulo: {
      type: Number,
    },
    descricao: {
      type: Number,
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

  module.exports = Banner