/**
 * @description redis客户端
 * @author Brannua
 */

const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')
const redisClient = redis.createClient(REDIS_CONFIG)

redisClient.on('error', err => {
  console.error(err)
})

module.exports = redisClient
