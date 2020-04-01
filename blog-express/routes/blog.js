var express = require('express'),
  router = express.Router();

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

router.get('/list', (req, res, next) => {
  // express框架自带的工具已经解析好了req.query
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
  
  const result = getList(author, keyword);
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    );
    next();
  });
});

module.exports = router;
