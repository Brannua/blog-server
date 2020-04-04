const {
  execSQL,
  escape,
} = require('../db/mysql')

const login = (username, password) => {
  // 预防sql注入攻击
  username = escape(username)
  password = escape(password)

  const sql = `select username, password from users where username=${username} and password=${password}`
  return execSQL(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}