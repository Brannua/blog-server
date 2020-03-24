/**
 * 封装Node.js连接Redis的模块
 */

const redis = require('redis'),
  { REDIS_CONFIG } = require('../config/db'),
  redisClient = redis.createClient(REDIS_CONFIG);

redisClient.on('error', err => {
  console.error(err);
});

// 写redis
function setVal(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

// 读redis
function getVal(key) {
  // promise处理异步
  return new Promise((resolve, reject)=>{
    redisClient.get(key, (err, val) => {
      // 处理报错
      if (err) {
        reject(err);
        return;
      }
      // 处理没有读取到数据
      if (val === null) {
        resolve(null);
        return;
      }
      // 尝试将读取到的数据转化为JSON
      // 转化失败就直接返回读取到的数据
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);        
      }
    });
  });
}

module.exports = { getVal, setVal };
