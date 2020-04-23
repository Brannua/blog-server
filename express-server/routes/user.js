/**
 * @description router user
 * @author Brannua
 */

const express = require('express')
const router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 用户登录 API
router.post('/login', (req, res) => {
  const { username, password } = req.body
  const result = login(username, password)

  return result.then(data => {
    if (data.username) {
      req.session.username = data.username
      req.session.password = data.password
      res.json(
        new SuccessModel({
          errno: 0,
          msg: '登陆成功',
        })
      )
      return
    }
    res.json(
      new ErrorModel({
        errno: -1,
        msg: '登录失败',
      })
    )
  })
})

module.exports = router
