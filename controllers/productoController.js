const database = require("../db/database.js");

const getProductos = async () => {
  let connection;
  try {
    connection = await database.getConnection();
    const [productos] = await connection.query("SELECT * FROM producto");
    return productos;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los productos');
  } finally {
    if (connection) connection.release();
  }
};

const getProductoById = async (idProducto) => {
  let connection;
  try {
    connection = await database.getConnection();
    const [producto] = await connection.query("SELECT * FROM producto WHERE idProducto = ?", [idProducto]);
    return producto[0];
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el producto');
  } finally {
    if (connection) connection.release();
  }
};

const createProducto = async (nombre, descripcion, precio, stock, idCategoria, imagen_url) => {
  let connection;
  try {
    connection = await database.getConnection();
    const [resultado] = await connection.query(
      "INSERT INTO producto (nombre, descripcion, precio, stock, idCategoria, imagen_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())", 
      [nombre, descripcion, precio, stock, idCategoria, imagen_url]
    );
    return resultado.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el producto');
  } finally {
    if (connection) connection.release();
  }
};

const updateProducto = async (idProducto, nombre, descripcion, precio, stock, idCategoria, imagen_url) => {
  let connection;
  try {
    connection = await database.getConnection();
    await connection.query(
      "UPDATE producto SET nombre = ?, descripcion = ?, precio = ?, stock = ?, idCategoria = ?, imagen_url = ?, updated_at = NOW() WHERE idProducto = ?", 
      [nombre, descripcion, precio, stock, idCategoria, imagen_url, idProducto]
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el producto');
  } finally {
    if (connection) connection.release();
  }
};

const deleteProducto = async (idProducto) => {
  let connection;
  try {
    connection = await database.getConnection();
    await connection.query("DELETE FROM producto WHERE idProducto = ?", [idProducto]);
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el producto');
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
