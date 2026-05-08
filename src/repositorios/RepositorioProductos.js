const Producto = require('../modelos/Producto');

class RepositorioProductos {
  constructor() {
    this.productos = [
      new Producto(1, 'Laptop', 1500000, 10),
      new Producto(2, 'Mouse', 35000, 50),
      new Producto(3, 'Teclado', 80000, 30),
    ];
    this.siguienteId = 4;
  }

  obtenerTodos() {
    return this.productos;
  }

  obtenerPorId(id) {
    return this.productos.find((p) => p.id === id) || null;
  }

  crear(nombre, precio, stock) {
    const nuevo = new Producto(this.siguienteId++, nombre, precio, stock);
    this.productos.push(nuevo);
    return nuevo;
  }

  actualizar(id, datos) {
    const producto = this.obtenerPorId(id);
    if (!producto) return null;
    Object.assign(producto, datos);
    return producto;
  }

  eliminar(id) {
    const indice = this.productos.findIndex((p) => p.id === id);
    if (indice === -1) return false;
    this.productos.splice(indice, 1);
    return true;
  }
}

module.exports = RepositorioProductos;
