var express = require('express'),
  router = express.Router();

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel'),
  loginCheck = require('../middleware/loginCheck');

router.get('/list', (req, res, next) => {

  // express框架自带的工具已经解析好了req.query
  const author = req.query.author || '',
    keyword = req.query.keyword || '';

  // todo ： 可以在这里添加管理员页面的校验逻辑

  const result = getList(author, keyword);
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    );
  });

});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    );
  });
});

router.post('/new', loginCheck, (req, res, next) => {

  const blogData = req.body;
  blogData.author = req.session.realname;

  const result = newBlog(blogData);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    );
  });

});

router.post('/update', loginCheck, (req, res, next) => {

  // 这里仅仅使用前端传来的id就可更新博客，是个漏洞
  const result = updateBlog(req.query.id, req.body);
  return result.then(value => {
    if (value) {
      res.json(
        new SuccessModel()
      );
      return;
    }
    res.json(
      new ErrorModel('更新博客失败')
    );
  });

});

router.post('/del', loginCheck, (req, res, next) => {
  // 这里需要前端传来的id和后端从session中获取的作者名做删除校验，更安全
  const author = req.session.username,
    result = delBlog(req.query.id, author);
  return result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      );
    } else {
      res.json(
        new ErrorModel('删除博客失败')
      );
    }
  });

});

module.exports = router;
