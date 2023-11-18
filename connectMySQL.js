const mysql = require("mysql2");

// Configuracion de la conexion al server de MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "tif",
});

// Conexion al server de MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

module.exports = connection;
