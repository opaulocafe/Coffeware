const mongoose = require("mongoose")

var Login = mongoose.model('Login', {
    celular: {
      type: String,
      required: true
    },
    senha: {
      type: String,
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

  module.exports = Login