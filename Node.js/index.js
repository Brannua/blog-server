/* env: process.env.NODE_ENV */

const handleBlogRouter = require('./src/router/blog'),
  handleUserRouter = require('./src/router/user');

const serverHandel = (req, res) => {
  // 解析出path并挂到req上
  req.path = req.url.split('?')[0];
  // 设置返回字符串数据的格式为json
  res.setHeader('Content-type', 'application/json');

  // 处理blog路由
  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  // 处理user路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // 未命中路由则返回404
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('404 Not Found\n');
  res.end();

}

module.exports = serverHandel;