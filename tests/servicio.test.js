const ServicioProductos = require('../src/servicios/ServicioProductos');

const repositorioMock = {
  obtenerTodos: jest.fn(),
  obtenerPorId: jest.fn(),
  crear: jest.fn(),
  actualizar: jest.fn(),
  eliminar: jest.fn(),
};

describe('ServicioProductos', () => {
  let servicio;

  beforeEach(() => {
    jest.clearAllMocks();
    servicio = new ServicioProductos(repositorioMock);
  });

  test('listarProductos llama al repositorio y retorna la lista', () => {
    repositorioMock.obtenerTodos.mockReturnValue([{ id: 1 }]);
    const resultado = servicio.listarProductos();
    expect(repositorioMock.obtenerTodos).toHaveBeenCalled();
    expect(resultado).toHaveLength(1);
  });

  test('obtenerProducto retorna el producto si existe', () => {
    repositorioMock.obtenerPorId.mockReturnValue({ id: 1, nombre: 'Laptop' });
    const producto = servicio.obtenerProducto(1);
    expect(producto.nombre).toBe('Laptop');
  });

  test('obtenerProducto lanza error si no existe', () => {
    repositorioMock.obtenerPorId.mockReturnValue(null);
    expect(() => servicio.obtenerProducto(99)).toThrow('no encontrado');
  });

  test('crearProducto crea con datos válidos', () => {
    repositorioMock.crear.mockReturnValue({ id: 4, nombre: 'Monitor', precio: 500000, stock: 5 });
    const nuevo = servicio.crearProducto('Monitor', 500000, 5);
    expect(nuevo.nombre).toBe('Monitor');
    expect(repositorioMock.crear).toHaveBeenCalledWith('Monitor', 500000, 5);
  });

  test('crearProducto lanza error si nombre está vacío', () => {
    expect(() => servicio.crearProducto('', 100, 1)).toThrow('nombre es obligatorio');
  });

  test('crearProducto lanza error si precio es negativo', () => {
    expect(() => servicio.crearProducto('Test', -1, 1)).toThrow('precio');
  });

  test('crearProducto lanza error si stock es negativo', () => {
    expect(() => servicio.crearProducto('Test', 100, -1)).toThrow('stock');
  });

  test('actualizarProducto actualiza si el producto existe', () => {
    repositorioMock.obtenerPorId.mockReturnValue({ id: 1 });
    repositorioMock.actualizar.mockReturnValue({ id: 1, precio: 999 });
    const resultado = servicio.actualizarProducto(1, { precio: 999 });
    expect(resultado.precio).toBe(999);
  });

  test('actualizarProducto lanza error si no existe', () => {
    repositorioMock.obtenerPorId.mockReturnValue(null);
    expect(() => servicio.actualizarProducto(99, {})).toThrow('no encontrado');
  });

  test('eliminarProducto retorna mensaje de éxito', () => {
    repositorioMock.eliminar.mockReturnValue(true);
    const resultado = servicio.eliminarProducto(1);
    expect(resultado.mensaje).toMatch('eliminado');
  });

  test('eliminarProducto lanza error si no existe', () => {
    repositorioMock.eliminar.mockReturnValue(false);
    expect(() => servicio.eliminarProducto(99)).toThrow('no encontrado');
  });
});
