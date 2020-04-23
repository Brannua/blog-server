/**
 * @description controller user
 * @author Brannua
 */

const { execSQL, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')

/**
 * 用户登录 controller
 * @param {string} username username
 * @param {string} password password
 */
const login = (username, password) => {

  // password = genPassword(password)  // 密码加密

  // 预防sql注入
  username = escape(username)
  password = escape(password)

  const sql = `select username, password from users where username=${username} and password=${password}`;

  return execSQL(sql).then(rows => {
    return rows[0] || {};
  })
}

module.exports = {
  login
}
