const request = require('supertest');
const express = require('express');
const crearRutasProductos = require('../src/rutas/rutasProductos');

const servicioMock = {
  listarProductos: jest.fn(),
  obtenerProducto: jest.fn(),
  crearProducto: jest.fn(),
  actualizarProducto: jest.fn(),
  eliminarProducto: jest.fn(),
};

function crearApp() {
  const app = express();
  app.use(express.json());
  app.use('/productos', crearRutasProductos(servicioMock));
  return app;
}

describe('Rutas /productos', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = crearApp();
  });

  test('GET /productos retorna lista con status 200', async () => {
    servicioMock.listarProductos.mockReturnValue([{ id: 1, nombre: 'Laptop' }]);
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('GET /productos/:id retorna el producto con status 200', async () => {
    servicioMock.obtenerProducto.mockReturnValue({ id: 1, nombre: 'Laptop' });
    const res = await request(app).get('/productos/1');
    expect(res.status).toBe(200);
    expect(res.body.nombre).toBe('Laptop');
  });

  test('GET /productos/:id retorna 404 si no existe', async () => {
    servicioMock.obtenerProducto.mockImplementation(() => {
      throw new Error('no encontrado');
    });
    const res = await request(app).get('/productos/99');
    expect(res.status).toBe(404);
  });

  test('POST /productos crea y retorna 201', async () => {
    servicioMock.crearProducto.mockReturnValue({ id: 4, nombre: 'Monitor', precio: 500000, stock: 5 });
    const res = await request(app).post('/productos').send({ nombre: 'Monitor', precio: 500000, stock: 5 });
    expect(res.status).toBe(201);
    expect(res.body.nombre).toBe('Monitor');
  });

  test('POST /productos retorna 400 con datos inválidos', async () => {
    servicioMock.crearProducto.mockImplementation(() => {
      throw new Error('nombre es obligatorio');
    });
    const res = await request(app).post('/productos').send({ nombre: '', precio: 100, stock: 1 });
    expect(res.status).toBe(400);
  });

  test('PUT /productos/:id actualiza y retorna 200', async () => {
    servicioMock.actualizarProducto.mockReturnValue({ id: 1, precio: 999 });
    const res = await request(app).put('/productos/1').send({ precio: 999 });
    expect(res.status).toBe(200);
    expect(res.body.precio).toBe(999);
  });

  test('DELETE /productos/:id elimina y retorna mensaje', async () => {
    servicioMock.eliminarProducto.mockReturnValue({ mensaje: 'Producto eliminado correctamente' });
    const res = await request(app).delete('/productos/1');
    expect(res.status).toBe(200);
    expect(res.body.mensaje).toMatch('eliminado');
  });
});
