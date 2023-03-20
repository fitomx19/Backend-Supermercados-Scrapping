const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProductosSchema = new Schema({
  precio: String,
  busqueda: String,
  nombre: String,
  url: String,
  fecha: String
});

module.exports = mongoose.model("Productos", ProductosSchema);