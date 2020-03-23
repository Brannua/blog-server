const handleBlogRouter = require('./src/router/blog'),
  handleUserRouter = require('./src/router/user'),
  querystring = require('querystring');

// 存储session的地方
const SESSION_DATA = {};

// 辅助函数 : 获取cookie的过期时间， 用在给客户端种植cookie时
const _getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

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

  // 尝试解析出cookie挂到req上
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    if (!item) { return }
    var arr = item.split('='),
      key = arr[0].trim(),
      val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 尝试解析出session挂到req上
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];

  _getPostData(req).then(postData => {
    // 将POST请求发送过来的数据挂到req上
    req.body = postData;

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        // 返回数据之前如果需要就给客户端种植sessionId
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${_getCookieExpires()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      // 命中路由则终止继续向下执行
      return;
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        // 返回数据之前如果需要就给客户端种植sessionId
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${_getCookieExpires()}`);
        }
        res.end(JSON.stringify(userData));
      });
      // 命中路由则终止继续向下执行
      return;
    }

    // 未命中路由则返回404
    res.writeHead(404, {
      'Content-type': 'text/plain'
    });
    res.write('404 Not Found\n');
    res.end();

  });
}

module.exports = serverHandel;
