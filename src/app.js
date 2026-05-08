const express = require('express');
const RepositorioProductos = require('./repositorios/RepositorioProductos');
const ServicioProductos = require('./servicios/ServicioProductos');
const crearRutasProductos = require('./rutas/rutasProductos');

const app = express();
app.use(express.json());

const repositorio = new RepositorioProductos();
const servicio = new ServicioProductos(repositorio);

app.use('/productos', crearRutasProductos(servicio));

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Productos funcionando' });
});

module.exports = app;

if (require.main === module) {
  const PUERTO = 3000;
  app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
  });
}
