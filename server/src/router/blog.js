/**
 * @description router blog
 * @author Brannua
 */

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/**
 * 辅助函数: 登录验证，用于拦截未登录的用户
 * @param {object} req req
 */
const _loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

/**
 * blog 控制器
 * @param {object} req req
 * @param {object} res res
 */
const handleBlogRouter = (req, res) => {
  const path = req.path
  const method = req.method
  const id = req.query.id

  // 获取博客列表 API
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情 API
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建博客 API
  if (method === 'POST' && path === '/api/blog/new') {
    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    const blogData = req.body
    blogData.author = req.session.username

    return newBlog(blogData).then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客 API
  if (method === 'POST' && path === '/api/blog/update') {
    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    // 注意这里仅仅使用前端传来的id就可更新博客，是个漏洞，删除博客 API 中给出了解决方案
    const blogData = req.body
    return updateBlog(id, blogData).then(value => {
      if (value) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客 API
  if (method === 'POST' && path === '/api/blog/del') {
    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    // 这里需要前端传来的id和后端从session中获取的作者名做删除校验，更安全
    const author = req.session.username
    return delBlog(id, author).then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter
