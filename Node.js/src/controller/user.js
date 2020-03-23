const execSQL = require('../db/mysql');

const login = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}'
  `;
  return execSQL(sql).then(rows => {
    return rows[0] || {};
  });
}

module.exports = {
  login
}