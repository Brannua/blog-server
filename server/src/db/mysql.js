/**
 * 封装Node.js连接Mysql的模块
 */

const mysql = require('mysql'),
  { MYSQL_CONFIG } = require('../config/db'),
  connection = mysql.createConnection(MYSQL_CONFIG);

// 开始连接
connection.connect();

// 统一执行SQL语句的函数
function execSQL(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = execSQL;
