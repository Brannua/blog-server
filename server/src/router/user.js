const {
  login
} = require('../controller/user'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const method = req.method,
    path = req.path;

  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    return login(username, password).then(data => {
      if (data.username) {

        // 成功登录则将用户信息保存到session中
        req.session.username = data.username;
        req.session.realname = data.realname;

        // 并将用户信息同步到redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }
}

module.exports = handleUserRouter;
