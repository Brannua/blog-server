/**
 * @description 登录验证中间件
 * @author Brannua
 */

const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(
    new ErrorModel('尚未登录')
  )
}
