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

- [学习Node.js开发server端的前置知识](https://blog.csdn.net/Brannua/article/details/105087923)

- [项目需求分析](https://blog.csdn.net/Brannua/article/details/105157351)

  - [接口设计](https://blog.csdn.net/Brannua/article/details/105157405)

  - [数据存储](https://blog.csdn.net/Brannua/article/details/105157460)

    - [SQL语句的基本操作](https://blog.csdn.net/Brannua/article/details/104652438)

    - [Node.js连接Mysql基本操作](https://blog.csdn.net/Brannua/article/details/104655696)

  - [登录功能](https://blog.csdn.net/Brannua/article/details/105157696)

    - [redis基本操作 & nodejs连接redis总结](https://blog.csdn.net/Brannua/article/details/105068265)

  - [配置nginx反向代理和前端同域联调](https://blog.csdn.net/Brannua/article/details/105156821)

  - [日志记录](https://blog.csdn.net/Brannua/article/details/105166088)

    - [Node.js文件操作基础](https://blog.csdn.net/Brannua/article/details/105139779)

    - [使用stream的方式进行服务端文件操作的原因和demo](https://blog.csdn.net/Brannua/article/details/105141050)
    
  - [网站后端安全](https://blog.csdn.net/Brannua/article/details/105185511)

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
