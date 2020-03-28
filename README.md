# 以博客项目为例学习后端开发的必备知识

> 快速启动项目

  ```
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

> 开发文档

- [学习Node.js开发server端的前置知识](https://blog.csdn.net/Brannua/article/details/105087923)

- [项目需求分析](https://blog.csdn.net/Brannua/article/details/105157351)

  - [接口设计](https://blog.csdn.net/Brannua/article/details/105157405)

  - [数据存储](https://blog.csdn.net/Brannua/article/details/105157460)

    - [SQL语句的基本操作](https://blog.csdn.net/Brannua/article/details/104652438)

  - [登录功能](https://blog.csdn.net/Brannua/article/details/105157696)

    - [redis基本操作 & nodejs连接redis总结](https://blog.csdn.net/Brannua/article/details/105068265)

  - [配置nginx反向代理和前端同域联调](https://blog.csdn.net/Brannua/article/details/105156821)  

  - [日志记录](https://blog.csdn.net/Brannua/article/details/105166088)

    - [Node.js文件操作基础](https://blog.csdn.net/Brannua/article/details/105139779)

    - [使用stream的方式进行服务端文件操作的原因](https://blog.csdn.net/Brannua/article/details/105141050)
    