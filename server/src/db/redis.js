/**
 * @description Node.js连接Redis的模块
 * @author Brannua
 */

const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')
const redisClient = redis.createClient(REDIS_CONFIG)

redisClient.on('error', err => {
  console.error(err)
})

/**
 * 写redis
 * @param {string} key key
 * @param {*} val val
 */
function setVal(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

/**
 * 读redis
 * @param {string} key key
 */
function getVal(key) {
  return new Promise((resolve, reject)=>{
    redisClient.get(key, (err, val) => {
      // 处理报错
      if (err) {
        reject(err)
        return
      }
      // 处理没有读取到数据
      if (val === null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)        
      }
    })
  })
}

module.exports = {
  getVal,
  setVal
}
