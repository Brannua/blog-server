const {
  login
} = require('../controller/user'), {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');

// 辅助函数 : 获取cookie的过期时间
const _getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const method = req.method,
    path = req.path;

  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    return login(username, password).then(data => {
      if (data.username) {
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${_getCookieExpires()}`);
        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    });
  }

  // 测试接口代码 : 登录验证
  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel({
        username: req.cookie.username
      }));
    }
    return Promise.resolve(new ErrorModel('尚未登录'));
  }

}

module.exports = handleUserRouter;
