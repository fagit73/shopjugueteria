require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port":process.env.DB_PORT,
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "shopjugueteria",
    "host": "3001",
    "dialect": "mysql",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0
  }
}