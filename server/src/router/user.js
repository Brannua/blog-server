/**
 * @description router user
 * @author Brannua
 */

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { setVal } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const path = req.path
  const method = req.method

  // 用户登录 API
  if (method === 'POST' && path === '/api/user/login') {

    const { username, password } = req.body

    return login(username, password)
      .then(data => {
        if (data.username) {

          // 登录成功将用户信息保存到session中
          req.session.username = data.username
          req.session.password = data.password
          // 将用户信息写入redis
          setVal(req.sessionId, req.session)

          return new SuccessModel()
        }
        return new ErrorModel('登录失败')
      })
  }
}

module.exports = handleUserRouter
