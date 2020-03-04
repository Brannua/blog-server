/**
 * Mysql的配置模块
 */

// 获取环境参数
const env = process.env.NODE_ENV

let MYSQL_CONFIG = null;

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    post: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    post: '3306',
    database: 'myblog'
  }
}

module.exports = MYSQL_CONFIG;
