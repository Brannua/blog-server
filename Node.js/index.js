const handleBlogRouter = require('./src/router/blog'),
  handleUserRouter = require('./src/router/user'),
  querystring = require('querystring');

// 辅助函数: 使用Promise的方式处理异步接收post请求发送过来的数据
const _getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    // 本项目只处理json数据
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    // 开始接收post过来的数据
    let postData = '';
    req.on('data', chunk => {
      postData += chunk;
    });
    req.on('end', () => {
      // 处理post发过来的数据为空的情况
      if (!postData) {
        resolve({});
        return;
      } else {
        resolve(JSON.parse(postData));
      }
    });
  });
}

const serverHandel = (req, res) => {
  // 设置返回字符串数据的格式为json
  res.setHeader('Content-type', 'application/json');
  // 解析出请求的路由并挂到req上
  req.path = req.url.split('?')[0];
  // 解析出GET请求的参数挂到req上
  req.query = querystring.parse(req.url.split('?')[1]);
  // 使用Promise的方式处理异步接收post请求发送过来的数据
  _getPostData(req).then(postData => {
    // POST请求的数据挂到req上
    req.body = postData;

    const blogResult = handleBlogRouter(req, res);
    // 处理blog路由
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      // 命中路由则终止继续向下执行
      return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      // 命中路由则终止继续向下执行
      return;
    }

    // 未命中路由则返回404
    res.writeHead(404, {
      'Content-type': 'text/plain'
    });
    res.write('404 Not Found\n');
    res.end();
  })

}

module.exports = serverHandel;