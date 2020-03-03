# 使用原生Node.js开发接口

- 从浏览器输入URL到显示页面的整个流程

  - 域名经过DNS解析成ip地址 , ip地址对应一台服务器 , 客户端与服务器之间建立TCP链接( 三次握手 ) , 客户端发送http请求

  - server端接收到http请求 , 处理并返回

  - 客户端接收到返回数据再处理数据( 如页面渲染 , 执行js )

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

    ```
    /* Node.js 处理http请求的综合demo */
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

- 搭建开发环境

  - 从0开始搭建 , 不使用任何框架

  - 使用nodemon检测文件变化 , 自动重启node

  - 使用cross-env设置环境变量

- 开发路由/接口( 暂时不连接数据库, 暂时不考虑登录功能 )

  - 初始化路由: 根据之前技术方案的设计 , 做出路由

  - 返回假数据: 将路由和数据处理分离 , 以符合设计原则
