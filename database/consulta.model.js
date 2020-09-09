'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ConsultaSchema = new Schema({
  id: {
    type: Number
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String
  },
  email: {
    type: String
  },
  telefono: {
    type: String
  },
  consulta: {
    type: String
  }

});

module.exports = (ConsultaSchema);
