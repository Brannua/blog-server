/**
 * 创建redis客户端
 */

const redis = require('redis'),
  { REDIS_CONFIG } = require('../config/db'),
  redisClient = redis.createClient(REDIS_CONFIG)

redisClient.on('error', err => {
  console.error(err)
});

module.exports = redisClient
