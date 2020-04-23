/**
 * @description 密码加密模块
 * @author Brannua
 */

const crypto = require('crypto')
const SECRET_KEY = 'wWja_#sad231' // 密匙: 实际项目中需要保密

/**
 * 辅助函数: md5加密
 * @param {String} content 需要加密的内容
 */
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密函数
 * @param {String} password 密码
 */
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword,
}
