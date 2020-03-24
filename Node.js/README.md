# 博客项目后端部分

- 快速启动项目

  ```
  #安装依赖
  cd Node.js
  npm install

  # 开启后端项目
  npm run dev

  # 开启前端项目
  cd html-test
  http-server -p 8001

  # 查看和配置nginx的配置
  cd /usr/local/nginx/conf
  vim nginx.conf

  # 开启nginx反向代理
  cd ../sbin
  sudo ./nginx
  ```

> Tips : 本次秉着学习的目的 , 并没有将技术方案设计地十分详尽 , 实际工作开发中需要更加详尽的技术方案

- 需求 : 开发博客系统的基本功能

  - 登录功能 : 登录页

  - 查看博客列表 : 首页 + 作者主页

  - 查看博客详情 : 博客详情页

  - 管理中心

    - 模糊查询

    - 撰写博客功能 : 新建页

    - 修改博客功能 : 编辑页

- 技术方案

  - 接口设计 ( 原则 : 路由和数据处理分离 )

    | 描述               | 接口             | 方法 | 参数                          | 备注                     |
    | :----------------- | :--------------- | :--- | :---------------------------- | :----------------------- |
    | 获取博客列表       | /api/blog/list   | get  | author作者, keyword搜索关键字 | 参数为空则不进行查询过滤 |
    | 获取一篇博客的内容 | /api/blog/detail | get  | id                            |                          |
    | 新增一篇博客       | /api/blog/new    | post |                               | post中有新增的信息       |
    | 更新一篇博客       | /api/blog/update | post | id                            | postData中有更新的内容   |
    | 删除一篇博客       | /api/blog/del    | post | id                            |                          |
    | 登录               | /api/user/login  | post |                               | postData中有用户名和密码 |

  - 数据存储( 关系型硬盘数据库 )

    - 考虑网站数据的特点

      - 操作频率不是很高

      - 断电不能丢失

      - 数据量大，内存条成本高

      - Mysql被广泛使用且符合需求

    - 所以采用Mysql数据库

    - [Mysql下载方式记录](https://blog.csdn.net/Brannua/article/details/105014296)

    - [SQL语句的基本操作记录](https://blog.csdn.net/Brannua/article/details/104652438)

    - [Workbench下载链接](https://dev.mysql.com/downloads/workbench/)

    - user表的设计 ( 密码可进行加密处理 )

      | column   | datatype    | pk主键 | nn不为空 | ai自动增加 | Default |
      | :------- | :---------- | :----- | :------- | :--------- | :------ |
      | id       | int         | Y      | Y        | Y          |         |
      | username | varchar(20) |        | Y        |            |         |
      | password | varchar(20) |        | Y        |            |         |
      | realname | varchar(10) |        | Y        |            |         |

    - blogs表的设计

      | column     | datatype    | pk主键 | nn不为空 | ai自动增加 | Default |
      | :--------- | :---------- | :----- | :------- | :--------- | :------ |
      | id         | int         | Y      | Y        | Y          |         |
      | title      | varchar(50) |        | Y        |            |         |
      | content    | longtext    |        | Y        |            |         |
      | createtime | bigint(20)  |        | Y        |            | 0       |
      | author     | varchar(20) |        | Y        |            |         |

    - 当controller中拼接sql语句, 参数不确定导致查询条件不确定的时候, 为了防止拼接的sql语句的格式异常导致报错, 我采用 ```where 1=1``` 的小技巧

      ```
        const getList = (author, keyword) => {
          let sql = 'select * from blogs where 1=1';
          if (author) {
            sql += ` and author='${author}'`;
          }
          if (keyword) {
            sql += ` and title like '%${keyword}%'`;
          }
          // ...
        }
      ```

  - 登录部分采用业界统一的解决方案

    - 核心 : 登录校验 && 登录信息存储

    - cookie的特点

      - 最大5kb

      - 字符串类型

      - 形如k1=v1;k2=v2;k3=v3;

      - 存储于浏览器

      - 跨域不共享

      - 前端每次发送http请求，都会将请求域的cookie一起发送给server( 比如百度请求淘宝，百度就会发送淘宝的cookie )

      - 浏览器查看cookie的三种方式 : 1.Application/Storage/Cookies 2.Network/Headers 3.document.cookie

    - server端nodejs操作cookie实现登录验证

      - 首先前端调用/api/user/login接口进行登录( 前端传过来的用户名密码和数据库中的用户名密码比对一下就可 )

      - 然后后端接收到登录请求，解析出用户名密码和数据库校验通过登陆成功后，向前端设置cookie

      - 当前端向验证登录的接口发送请求就会携带cookie，后端接收到cookie就可以根据cookie中的值判断是否已经登录

      ```
        /**
         * 登陆成功后后端给前端设置cookie示例如下
         * 设置path=/字段让前端项目的所有页面都是登录状态
         * 设置httpOnly字段不允许前端js修改该cookie
         * 设置expires字段指明cookie的过期时间
         */    
        // 辅助函数 : 获取cookie的过期时间
        const _getCookieExpires = () => {
          const d = new Date();
          d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
          return d.toGMTString();
        }
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${_getCookieExpires()}`);
      ```

      - 单纯使用cookie实现登录验证有两处不足如下

        - 不能在cookie中存放十分重要的用户信息，否则会泄露用户个人信息

        - cookie的可存储数据量十分有限，最大5kb

      - 解决方案 : session

        - 默认不需要给客户端种植包含用户唯一标识(userId)的cookie ```let needSetCookie = false;```

        - server端尝试获取cookie中的userId，再尝试依据此userId从server端session中获取用户信息的思路

          - 如果从cookie中解析出userId( 非首次访问且cookie未过期 )

            - 如果没获取到```session[userId]```中的数据，则初始化```session[userId]```为{}( 尚未登录 )

          - 如果从cookie中没有解析出userId( 首次访问或cookie已过期 )
          
            - 将needSetCookie设置为true，在命中接口向前端返回数据的前一刻向前端种植包含userId的cookie
            
            - 创建唯一标识userId( 用来给客户端种植cookie )

            - 初始化```session[userId]```为{}( 尚未登录 )

          - 最后将```session[userId]```挂到req.session上

          - 如果是未登录的状态，那么在调用登录接口登陆成功的回调函数中将用户信息保存到req.session中

      - 但当前session是一个js变量，存放在nodejs进程中，会有如下问题

        - 进程内存有限，访问量过大，内存暴增是个问题

        - 项目正式上线运行是多进程，进程之间内存无法共享

      - 考虑session的特点

        - session放在index.js所有访问的入口中，访问频繁，对性能要求极高

        - session可以不考虑断电丢失数据的问题

        - session数据量不会很大

      - 所以将session拆分到redis中解决上面的问题

        - [redis基本操作 & nodejs连接redis总结](https://blog.csdn.net/Brannua/article/details/105068265)

        - redis将数据存放在内存中，内存的读写速度快，但价格昂贵，且数据非持久化保存( 断电丢失 )

        - 将web server、redis、mysql拆分成三个单独的服务，三方都是独立的，都是可扩展的( 例如都可扩展为集群 )

    - 和前端联调

      - 登录功能依赖cookie，需要使用浏览器来联调

      - 前端项目在开发阶段的运行依赖
      
        ```
        npm install http-server -g

        http-server -p 8001
        ```

      - 此时前端项目运行在8001端口，后端项目运行在8000端口，存在跨域无法共享cookie的问题

      - nginx概述

        - 高性能web服务器，开源免费

        - 反向代理

        - 一般用于做静态服务和负载均衡( 本项目未使用到 )

      - 所以本项目配置nginx反向代理，让前后端监听同一端口( 8800 )同域联调

        - 比如http://localhost:8800/index.html会被代理到http://localhost:8001/index.html

        - 比如http://localhost:8800/api/blog/list会被代理到http://localhost:8000/api/blog/list

        - 安装nginx参考 : [CSDN博客](https://blog.csdn.net/CSDN_FlyYoung/article/details/94591864)

        ```
          修改nginx配置反向代理

          worker_processes <主机核心数>;

          location / {
              proxy_pass http://localhost:8001;
          }

          location /api/ {
              proxy_pass http://localhost:8000;
              proxy_set_header Host $host; 
          }
        ```

        ```
          - 测试配置文件格式是否正确 : nginx -t

          - 启动 nginx 

          - 重启 nginx -s reload

          - 停止 nginx -s stop
        ```

      
        