const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'root',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

module.exports = db;