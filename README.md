# 从浏览器输入URL到显示页面的整个流程

- 域名经过DNS解析成ip地址 , ip地址对应一台服务器 , 客户端与服务器之间建立TCP链接( 三次握手 ) , 客户端发送http请求

- server端接收到http请求 , 处理并返回

- 客户端接收到返回数据再处理数据( 如页面渲染 , 执行js )

# server开发和前端开发的区别

- 服务稳定性

  - server端可能会遭受各种恶意攻击和误操作

  - 单个客户端可以意外挂掉 , 但是服务端不能

  - 本次学习使用PM2做进程守护( 进程一旦挂掉就会自动重启而不用人工干预 )

- 考虑内存和CPU( 优化、扩展 )

  - 客户端独占一个浏览器 , 内存和CPU都不是问题

  - server端要承载很多请求 , CPU和内存都是稀缺资源

  - 本次学习使用stream记录日志 , 这种记录日志的方法十分解决CPU和内存 , 是一种优化方案
  
  - 本次学习使用redis存储session , 是扩展server端承载能力的一种方法

- 日志记录

  - 前端会参与写日志 , 但只是日志的发起方 , 不关心后续

  - server端要
    - 记录日志
    - 存储日志
    - 分析日志

  - 本次学习了多种记录日志的方法 , 也学习了如何分析日志

- 安全

  - server端要随时准备接收各种恶意攻击 , 前端则少很多 , 如越权操作、数据库攻击等

  - 本次学习了登录验证、预防XSS攻击和sql注入

- 集群和服务拆分

  - 如果产品发展速度快 , 流量会迅速增加 , 就需要考虑通过扩展机器和服务拆分的方式承载大流量

  - 本次学习是单机开发 , 但是从设计上支持服务拆分

# 原生Node.js开发接口接收并处理http请求的方式

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
