# 使用koa2框架对原生blog-server的重构版本

- [koa2处理异步任务的优势 async/await](https://blog.csdn.net/Brannua/article/details/105302800)

- koa2下载安装和使用

  - 安装脚手架 koa-generator

  ```
    npm install koa-generator -g
  ```
  
  - 使用脚手架搭建项目

  ```
    koa2 <项目名称>
  ```

  - 安装项目依赖

  ```
    npm install
  ```

  - 运行项目

  ```
    # 普通方式
    npm start

    # 测试和开发的运行方式
    npm run dev

    # 线上环境的运行方式
    npm run prd
  ```

-------------------

### 重构文档

- 实现登录

  - koa-generic-session & redis & koa-redis



