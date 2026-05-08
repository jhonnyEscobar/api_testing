const request = require('supertest');
const app = require('../src/app');

describe('API Productos - Pruebas de integración', () => {

  // ─── LISTAR ───────────────────────────────────────────────
  describe('GET /productos', () => {
    test('retorna la lista completa de productos', async () => {
      const res = await request(app).get('/productos');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // ─── OBTENER UNO ──────────────────────────────────────────
  describe('GET /productos/:id', () => {
    test('retorna el producto correcto por id', async () => {
      const res = await request(app).get('/productos/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
      expect(res.body).toHaveProperty('nombre');
    });

    test('retorna 404 si el producto no existe', async () => {
      const res = await request(app).get('/productos/9999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  // ─── CREAR ────────────────────────────────────────────────
  describe('POST /productos', () => {
    test('crea un producto con datos válidos', async () => {
      const res = await request(app)
        .post('/productos')
        .send({ nombre: 'Monitor', precio: 500000, stock: 5 });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nombre).toBe('Monitor');
    });

    test('retorna 400 si el nombre está vacío', async () => {
      const res = await request(app)
        .post('/productos')
        .send({ nombre: '', precio: 100, stock: 1 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    test('retorna 400 si el precio es negativo', async () => {
      const res = await request(app)
        .post('/productos')
        .send({ nombre: 'Test', precio: -1, stock: 1 });
      expect(res.status).toBe(400);
    });
  });

  // ─── ACTUALIZAR ───────────────────────────────────────────
  describe('PUT /productos/:id', () => {
    test('actualiza el precio de un producto existente', async () => {
      const res = await request(app)
        .put('/productos/1')
        .send({ precio: 999000 });
      expect(res.status).toBe(200);
      expect(res.body.precio).toBe(999000);
    });

    test('retorna 404 si el producto no existe', async () => {
      const res = await request(app)
        .put('/productos/9999')
        .send({ precio: 100 });
      expect(res.status).toBe(404);
    });
  });

  // ─── ELIMINAR ─────────────────────────────────────────────
  describe('DELETE /productos/:id', () => {
    test('elimina un producto existente', async () => {
      const res = await request(app).delete('/productos/2');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('mensaje');
    });

    test('retorna 404 si el producto no existe', async () => {
      const res = await request(app).delete('/productos/9999');
      expect(res.status).toBe(404);
    });
  });

});
