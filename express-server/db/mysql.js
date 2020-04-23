/**
 * @description Node.js连接Mysql的模块
 * @author Brannua
 */

const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')
const connection = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
connection.connect()

/**
 * 统一执行SQL语句
 * @param {string} sql sql
 */
function execSQL(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

module.exports = {
  execSQL,
  escape: mysql.escape,
}
