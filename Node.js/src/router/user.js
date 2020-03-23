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

        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }

  // 测试接口代码 : 登录验证
  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }

}

module.exports = handleUserRouter;
