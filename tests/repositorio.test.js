const RepositorioProductos = require('../src/repositorios/RepositorioProductos');

describe('RepositorioProductos', () => {
  let repositorio;

  beforeEach(() => {
    repositorio = new RepositorioProductos();
  });

  test('obtenerTodos retorna la lista inicial de productos', () => {
    const productos = repositorio.obtenerTodos();
    expect(productos).toHaveLength(3);
  });

  test('obtenerPorId retorna el producto correcto', () => {
    const producto = repositorio.obtenerPorId(1);
    expect(producto.nombre).toBe('Laptop');
  });

  test('obtenerPorId retorna null si no existe', () => {
    expect(repositorio.obtenerPorId(999)).toBeNull();
  });

  test('crear agrega un nuevo producto', () => {
    const nuevo = repositorio.crear('Monitor', 500000, 5);
    expect(nuevo.id).toBe(4);
    expect(nuevo.nombre).toBe('Monitor');
    expect(repositorio.obtenerTodos()).toHaveLength(4);
  });

  test('actualizar modifica los datos del producto', () => {
    const actualizado = repositorio.actualizar(1, { precio: 1200000 });
    expect(actualizado.precio).toBe(1200000);
  });

  test('actualizar retorna null si el producto no existe', () => {
    expect(repositorio.actualizar(999, { precio: 0 })).toBeNull();
  });

  test('eliminar borra el producto y retorna true', () => {
    expect(repositorio.eliminar(2)).toBe(true);
    expect(repositorio.obtenerTodos()).toHaveLength(2);
  });

  test('eliminar retorna false si el producto no existe', () => {
    expect(repositorio.eliminar(999)).toBe(false);
  });
});
