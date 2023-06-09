
const express = require("express");
const router = express.Router();
const Productos = require("../models/Productos");
var mongoose = require('mongoose');



// Definir la ruta para obtener todos los datos
router.get('/datos', async (req, res) => {
    const datos = await Productos.find()
    //ordenar los datos por fecha de manera descendente
    datos.sort(function(a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    });

    res.status(200).send({
      status: 'Success',
      data: datos,
    })
})

router.get('/keywords', async (req, res) => {
  try {
    const result = await Productos.aggregate([
      { $match: { palabrasClaveEncontradas: { $exists: true } } },
      { $unwind: "$palabrasClaveEncontradas" },
      {
        $group: {
          _id: "$palabrasClaveEncontradas",
          count: { $sum: 1 },
        },
      },
    ]);
    const lista = result.map((item) => item._id);
    res.status(200).send({
      status: "Success",
      lista: lista,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "Error",
      message: "Error al obtener los datos",
    });
  }
});

router.get('/supermercados/:nombre', async (req, res) => {
  let supermercado = req.params.nombre;

  const tiendas = await Productos.find({tienda: supermercado})

  //Agrupar los productos por nombre
/*   let productosAgrupados = tiendas.reduce((r, a) => {
    r[a.nombre] = [...(r[a.nombre] || []), a];
    return r;
  }, {}); */

  res.status(200).send({
    status: 'Success',
    data: tiendas,
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


//comparar precios de productos dados las keywords y la ultima fecha de busqueda
router.post('/datos/busqueda/ultima-busqueda', async (req, res) => {

  //obtener el json de la busqueda
  const temp = req.body
  
   //extraer el id del producto
  const _id = temp._id
  //buscar el producto por id
  const producto = await Productos.findById(_id)
  
  //mapear el array de palabras clave encontradas
  const resultados = []

  await Promise.all(producto.palabrasClaveEncontradas.map(async (palabraClave) => {
    const resultado = await Productos.find({palabrasClaveEncontradas: palabraClave})
    resultados.push(resultado)
  })) 

  
  //agrupar los productos por nombre y por tienda
  const productosPorNombre = resultados.flat().reduce((acc, producto) => {
    if (acc[producto.nombre]) {
      acc[producto.nombre].push(producto);
    } else {
      acc[producto.nombre] = [producto];
    }
    return acc;
  }, {});

  console.log(productosPorNombre)
  //imprimir productosAgrupadosPorTienda
  //console.log(productosPorNombre)
  res.status(200).send({
    status: 'Success',
    data: productosPorNombre
  })    
})


module.exports = router;

