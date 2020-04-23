/**
 * @description router blog
 * @author Brannua
 */

const express = require('express')
const router = express.Router()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

// 获取博客列表 API
router.get('/list', (req, res, next) => {
  // express框架自带的工具已经解析好了req.query
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''

  const result = getList(author, keyword)

  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
})

// 获取博客详情 API
router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

// 新建博客 API
router.post('/new', loginCheck, (req, res, next) => {
  const blogData = req.body
  blogData.author = req.session.username
  const result = newBlog(blogData)

  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

// 更新博客 API
router.post('/update', loginCheck, (req, res, next) => {
  // 注意这里仅仅使用前端传来的id就可更新博客，是个漏洞，删除博客 API 中给出了解决方案
  const result = updateBlog(req.query.id, req.body)

  return result.then(value => {
    if (value) {
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel('更新博客失败')
    )
  })
})

// 删除博客 API
router.post('/del', loginCheck, (req, res, next) => {
  // 这里需要前端传来的id和后端从session中获取的作者名做删除校验，更安全
  const author = req.session.username
  const result = delBlog(req.query.id, author)

  return result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('删除博客失败')
      )
    }
  })
})

module.exports = router
