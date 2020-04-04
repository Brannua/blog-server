const { ErrorModel } = require('../model/resModel')

// 中间件 : 登录验证，用于拦截未登录的用户
module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(
    new ErrorModel('尚未登录')
  )
}
