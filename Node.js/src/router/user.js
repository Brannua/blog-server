
const handleUserRouter = (req, res) => {
  const method = req.method,
    path = req.path;

  // 登录接口
  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是登录的接口'
    }
  }

}

module.exports = handleUserRouter;