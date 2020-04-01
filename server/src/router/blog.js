const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog');

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

// 辅助函数 : 登录验证，用于拦截未登录的用户
const _loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    );
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method,
    path = req.path,
    id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || '',
      keyword = req.query.keyword || '';

    // // 管理员界面( 前端访问路由需要增添isadmin参数 )
    // if (req.query.isadmin) {
    //   // 拦截未登录用户
    //   const loginCheckResult = _loginCheck(req);
    //   if (loginCheckResult) {
    //     // 未登录
    //     return loginCheckResult;
    //   }
    //   // 强制查询自己的博客
    //   author = req.session.username;
    // }

    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => {
      return new SuccessModel(data);
    });
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {

    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const blogData = req.body;
    blogData.author = req.session.username;
    return newBlog(blogData).then(data => {
      return new SuccessModel(data);
    });
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {

    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const blogData = req.body;
    // 这里仅仅使用前端传来的id就可更新博客，是个漏洞，
    return updateBlog(id, blogData).then(value => {
      if (value) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    });
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {

    // 拦截未登录用户
    const loginCheckResult = _loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const author = req.session.username;
    // 这里需要前端传来的id和后端从session中获取的作者名做删除校验，更安全
    return delBlog(id, author).then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除博客失败');
      }
    });
  }

}

module.exports = handleBlogRouter;