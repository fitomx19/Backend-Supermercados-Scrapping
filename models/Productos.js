const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProductosSchema = new Schema({
  precio: String,
  busqueda: String,
  nombre: String,
  url: String,
  fecha: String,
  tienda: String,
  fecha: String,
  gramaje: Number,
  precioPorGramo: Number,
  palabrasClaveEncontradas: [String]
});

module.exports = mongoose.model("Productos", ProductosSchema);