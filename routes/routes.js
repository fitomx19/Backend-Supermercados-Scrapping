
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
  

// Definir la ruta para obtener un dato en particular
router.get('/datos/:id', async (req, res) => {
    const user = await Productos.findById(req.params.id)
    res.status(200).send({
      status: 'Success',
      data: user,
    })
})

//obtener datos por busqueda de nombre de producto
router.post('/datos/busqueda', async (req, res) => {
    const user = await Productos.find({busqueda: req.body.busqueda})
    res.status(200).send({
      status: 'Success',
      data: user,
    })
})

//obtener datos por busqueda de nombre de producto , fecha y tienda
router.post('/datos/busqueda/datos-busqueda', async (req, res) => {
  const user = await Productos.find({busqueda: req.body.busqueda, fecha: req.body.fecha, tienda: req.body.tienda})
  res.status(200).send({
    status: 'Success',
    data: user,
  })
})

module.exports = router;