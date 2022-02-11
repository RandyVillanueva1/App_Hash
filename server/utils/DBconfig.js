const mysql = require('mysql');

class DBconfig {

  getConnection() {
    let connection = mysql.createConnection({
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "",
      database: "hash",
    });
    connection.connect();

    return connection;
  }
}

module.exports = DBconfig;