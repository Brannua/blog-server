# 使用express框架对原生blog-server的重构版本

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

-------------------

### 重构文档

- 复用代码

  - config & db & model & controller & utils

- 登录功能

  - 插件( 中间件的形式 )
    - express.session : 配置cookie-session实现登录
    - redis
    - connect-redis ： 配置req.sesson自动同步redis

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