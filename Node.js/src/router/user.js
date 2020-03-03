const {
  loginCheck
} = require('../controller/user'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');


const handleUserRouter = (req, res) => {
  const method = req.method,
    path = req.path;

  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    result = loginCheck(username, password);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('登录失败');
    }
  }

}

module.exports = handleUserRouter;
