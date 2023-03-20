
const express = require("express");
const router = express.Router();
const Productos = require("../models/Productos");
var mongoose = require('mongoose');



// Definir la ruta para obtener todos los datos
router.get('/datos', async (req, res) => {
    const allUsers = await Productos.find()
    res.status(200).send({
      status: 'Success',
      data: allUsers,
    })
})
  

  module.exports = router;