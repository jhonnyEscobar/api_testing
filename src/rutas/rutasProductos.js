const express = require('express');
const router = express.Router();

function crearRutasProductos(servicio) {
  router.get('/', (req, res) => {
    const productos = servicio.listarProductos();
    res.json(productos);
  });

  router.get('/:id', (req, res) => {
    try {
      const producto = servicio.obtenerProducto(req.params.id);
      res.json(producto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  router.post('/', (req, res) => {
    try {
      const { nombre, precio, stock } = req.body;
      const nuevo = servicio.crearProducto(nombre, precio, stock);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.put('/:id', (req, res) => {
    try {
      const actualizado = servicio.actualizarProducto(req.params.id, req.body);
      res.json(actualizado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  router.delete('/:id', (req, res) => {
    try {
      const resultado = servicio.eliminarProducto(req.params.id);
      res.json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  return router;
}

module.exports = crearRutasProductos;
