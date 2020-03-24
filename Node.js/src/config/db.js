/**
 * Mysql的配置模块
 * 使用cross-env包在package.json中配置环境参数
 */

// 获取环境参数用来区分mysql配置
const env = process.env.NODE_ENV;
let MYSQL_CONFIG = null;
let REDIS_CONFIG = null;

if (env === 'dev') {
  // mysql
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'lpj374453156....',
    database: 'myblog'
  }

  // redis
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379,
    password: 123456,
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'lpj374453156....',
    database: 'myblog'
  },

  // redis
  REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379,
    password: 123456,
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};
