# 以博客项目为例学习后端开发的必备知识

## server: 原生nodejs开发的blog-server

> 快速启动项目

  ```shell
    # 开启nginx反向代理
    cd /usr/local/nginx/sbin
    sudo ./nginx

    # 开启后端项目
    cd server
    npm install
    npm run dev

    # 前端用来测试
    cd html-test
    npm install
    npm run dev

    # 测试预览
    默认预览 : http://localhost:8800/index.html
    可自定义nginx代理端口进行预览 : http://localhost:<nginx代理端口>/index.html
  ```

> 开发笔记 & 文档

- <a href="https://blog.csdn.net/Brannua/article/details/105087923" target="_blank">学习Node.js开发server端的前置知识</a>

- <a href="https://blog.csdn.net/Brannua/article/details/105157351" target="_blank">项目需求分析</a>

  - <a href="https://blog.csdn.net/Brannua/article/details/105157405" target="_blank">接口设计</a>
  
  - <a href="https://blog.csdn.net/Brannua/article/details/105157460" target="_blank">数据存储</a>
  
    - <a href="https://blog.csdn.net/Brannua/article/details/104652438" target="_blank">SQL语句的基本操作</a>
    
    - <a href="https://blog.csdn.net/Brannua/article/details/104655696" target="_blank">Node.js连接Mysql基本操作</a>
    
  - <a href="https://blog.csdn.net/Brannua/article/details/105157696" target="_blank">登录功能</a>
  
    - <a href="https://blog.csdn.net/Brannua/article/details/105068265" target="_blank">redis基本操作 & nodejs连接redis总结</a>
    
  - <a href="https://blog.csdn.net/Brannua/article/details/105156821" target="_blank">配置nginx反向代理和前端同域联调</a>
  
  - <a href="https://blog.csdn.net/Brannua/article/details/105166088" target="_blank">日志记录</a>
  
    - <a href="https://blog.csdn.net/Brannua/article/details/105139779" target="_blank">Node.js文件操作基础</a>
    
    - <a href="https://blog.csdn.net/Brannua/article/details/105141050" target="_blank">使用stream的方式进行服务端文件操作的原因和demo</a>
    
  - <a href="https://blog.csdn.net/Brannua/article/details/105185511" target="_blank">网站后端安全</a>

## express-server： 使用express框架对./server的重构版本

> express是nodejs最常用的web server框架

- express下载安装和使用

  - 安装脚手架 express-generator

  ```
    npm install express-generator -g
  ```
  
  - 使用脚手架搭建项目

  ```
    express <项目名称>
  ```

  - 安装项目依赖

  ```
    npm install
  ```

  - 运行项目

  ```
    # 普通方式
    npm start

    # 自定义的二次开发的运行方式
    npm run dev

    # 自定义的线上环境的运行方式
    npm run prd
  ```

> 重构笔记

- 复用代码

  - config & db & model & controller & utils

- 登录功能

  - 插件( 中间件的形式 )
    - express.session: 配置cookie-session实现登录
    - redis
    - connect-redis： 配置req.sesson自动同步redis

  - 登录校验做成中间件

    - 管理员页面校验逻辑 ( 代码中没有添加这一块，仅作为学习 )

    ```
      // 管理员界面( 前端访问路由需要增添isadmin参数 )
      if (req.query.isadmin) {
        // 拦截未登录用户
        if (!req.session.username) {
          // 未登录
          res.json(
            new ErrorModel('未登录')
          );
          return;
        }
        // 强制查询自己的博客
        author = req.session.username;
      }
    ```

- 日志记录

  - access log 记录，使用express脚手架推荐的morgan

  - 自定义日志使用console.log & console.error

------------------

# express中间件机制 & 原理分析

> 采用ES6语法 面向对象、面向接口 编程实现

- 注册的中间件需要收集起来

- 遇到http请求，需要根据path和method判断触发哪些中间件

- 实现中间件机制的next()机制

- 实现中间件机制的核心接口

  - app.listen(PORT, callback)

  - app.use()

    - app.use(middleware)

    - app.use('/', callback)

    - app.use('/', middlewares, callback)

  - app.get()

    - app.get(middleware)

    - app.get('/', callback)

    - app.get('/', middlewares, callback)

  - app.post()

    - app.post(middleware)

    - app.post('/', callback)

    - app.post('/', middlewares, callback)

  - res.json()


-------------------------

## 实现笔记

- 以下两种写法等价

  ```js
    app.use((req, res, next) => {
      // ...
    })

    app.use('/', (req, res, next) => {
      // ...
    })
  ```

- 对于url: /api/user/login，如下形式path的中间件都对应

  ```
    /
    /api
    /api/user
    /api/user/login
  ```

- 所以使用方法indexOf()

  ```js
    url.indexOf(path) === 0
  ```

- 第一个中间件会立即执行，如果用户使用了next()，就会继续使用下一个中间件

  ```js
    Array.prototype.shift()
  ```
