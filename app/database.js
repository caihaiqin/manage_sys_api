const mysql = require('mysql2')
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_NAME,
  MYSQL_USER,
  MYSQL_PASSWORD
} = require('../app/config')

const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_NAME,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
})

pool.getConnection(err => {
  if (!err) {
    console.log("数据库连接成功");
  }
})

module.exports = pool.promise();