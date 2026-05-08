class ServicioProductos {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  listarProductos() {
    return this.repositorio.obtenerTodos();
  }

  obtenerProducto(id) {
    const producto = this.repositorio.obtenerPorId(Number(id));
    if (!producto) throw new Error(`Producto con id ${id} no encontrado`);
    return producto;
  }

  crearProducto(nombre, precio, stock) {
    if (!nombre || nombre.trim() === '') throw new Error('El nombre es obligatorio');
    if (precio == null || precio < 0) throw new Error('El precio debe ser mayor o igual a 0');
    if (stock == null || stock < 0) throw new Error('El stock debe ser mayor o igual a 0');
    return this.repositorio.crear(nombre.trim(), precio, stock);
  }

  actualizarProducto(id, datos) {
    const producto = this.repositorio.obtenerPorId(Number(id));
    if (!producto) throw new Error(`Producto con id ${id} no encontrado`);
    return this.repositorio.actualizar(Number(id), datos);
  }

  eliminarProducto(id) {
    const eliminado = this.repositorio.eliminar(Number(id));
    if (!eliminado) throw new Error(`Producto con id ${id} no encontrado`);
    return { mensaje: 'Producto eliminado correctamente' };
  }
}

module.exports = ServicioProductos;
