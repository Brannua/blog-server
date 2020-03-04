# 使用原生Node.js开发接口

- 使用cross-env设置环境变量

  ```
  env: process.env.NODE_ENV
  ```

- 学习nodejs处理http请求

  - get请求和querystring  

    - 即客户端要向server端获取数据 , 如查询博客列表

    - 通过querystring来传递数据 , 如a.html?a=100&b=200

    - 浏览器直接访问就发送get请求

  - post请求

    - post请求即客户端要向服务端传递数据 , 如新建博客

    - 本次学习中通过自定义的postData传递数据

    - 浏览器无法直接模拟 , 可以使用postman模拟

      - 可以选择安装postman谷歌插件 , 小巧轻量 , 搜索postman chrome crx就会出现安装教程

      - 也可以在postman官网安装postman app进行使用

-----------------------------

```
/**
  * Node.js处理Http请求的综合Demo
  * Node.js符合CommonJs模块化规范
  */

const http = require('http'),
  querystring = require('querystring');

http.createServer((req, res) => {

  // 数据格式
  console.log('content-type: ', req.headers['content-type']);

  const method = req.method,
    url = req.url,
    path = url.split('?')[0],
    query = querystring.parse(url.split('?')[1]);

  // 设置返回字符串的格式为json
  res.setHeader('Content-type', 'application/json');

  // 返回数据
  const resData = {
    method,
    url,
    path,
    query,
  }

  // 返回数据
  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }
  if (method === 'POST') {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk;
    });
    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }

}).listen(3000, () => {
  console.log('running at port 3000.');
});
```
