var express = require('express'),
  router = express.Router();

const {
  login
} = require('../controller/user'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

router.post('/login', (req, res) => {
  const { username, password } = req.body,
    result = login(username, password);
  return result.then(data => {
    if (data.username) {
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(
        new SuccessModel({
          errno: 0,
          msg: '登陆成功',
        })
      );
      return;
    }
    res.json(
      new ErrorModel({
        errno: -1,
        msg: '登录失败',
      })
    );
  });

});

module.exports = router;
