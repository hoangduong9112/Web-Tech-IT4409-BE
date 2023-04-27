const mysql = require("mysql");
const dbConfig = require("./DbConfig.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;