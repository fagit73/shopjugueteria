const mysql = require('mysql2/promise');
const dotenv = require("dotenv");

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const getConnection = async () => await pool.getConnection();

const initializeDatabase = async () => {
  let connection;
  try {
    connection = await getConnection();

    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS shopjugueteria';
    await connection.query(sqlCreatedb);
    console.log('Base de datos: creada o existente.');

    await connection.changeUser({ database: 'shopjugueteria' });

    const createProductoTableQuery = `
      CREATE TABLE IF NOT EXISTS producto (
        idProducto INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        idCategoria INT NOT NULL,
        imagen_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

    await connection.query(createProductoTableQuery);
    console.log('Tabla producto: creada o existente/garantizada.');

    const createUsuarioTableQuery = `
      CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )`;

    await connection.query(createUsuarioTableQuery);
    console.log('Tabla usuario: creada o existente/garantizada.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

initializeDatabase();

module.exports = {
  getConnection
};
