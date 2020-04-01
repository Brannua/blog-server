var express = require('express'),
  router = express.Router();

const {
  login
} = require('../controller/user'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  return login(username, password).then(data => {
    if (data.username) {
      // app.js中已经使用插件以中间件的方式
      // 配置好了cookie-session实现登录和session自动同步redis的流程
      // 所以这里直接读写req.session就可以将数据自动同步到redis
      req.session.username = data.username;
      req.session.realname = data.realname;

      res.json(
        new SuccessModel({
          errno: 0,
          msg: '登陆成功',
        })
      );
    } else {
      res.json(
        new ErrorModel({
          errno: -1,
          msg: '登录失败',
        })
      );
    }
  });
});

module.exports = router;
