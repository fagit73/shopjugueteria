const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productoController.js");

// Ruta para obtener todos los productos
router.get("/list", async (req, res) => {
  try {
    const productos = await productosController.getProductos();
    res.json({ success: true, data: productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener productos' });
  }
});

// Ruta para obtener un producto por su ID
router.get("/:idProducto", async (req, res) => {
  try {
    const { idProducto } = req.params;
    const producto = await productosController.getProductoById(idProducto);
    if (producto) {
      res.json({ success: true, data: producto });
    } else {
      res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener el producto' });
  }
});

// Ruta para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, idCategoria, imagen_url } = req.body;
    const nuevoProductoId = await productosController.createProducto(nombre, descripcion, precio, stock, idCategoria, imagen_url);
    res.json({ success: true, data: { id: nuevoProductoId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al crear el producto' });
  }
});

// Ruta para actualizar un producto por su ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, idCategoria, imagen_url } = req.body;
    await productosController.updateProducto(id, nombre, descripcion, precio, stock, idCategoria, imagen_url);
    res.json({ success: true, message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar el producto' });
  }
});

// Ruta para eliminar un producto por su ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await productosController.deleteProducto(id);
    res.json({ success: true, message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar el producto' });
  }
});

module.exports = router;
