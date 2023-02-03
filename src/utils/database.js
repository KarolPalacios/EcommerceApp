const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false
});

module.exports = db;