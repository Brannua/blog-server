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
  ```

-------------------

### 重构文档

- 复用代码

  - config & db & model & controller & utils

- 登录功能

  - 插件
    - express.session
    - connect-redis

  - req.session保存登录信息

  - 登录校验做成中间件


  