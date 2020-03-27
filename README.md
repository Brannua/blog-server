# 以博客项目为例学习后端开发的必备知识

> Tips : 本次秉着学习的目的 , 并没有将技术方案设计地十分详尽 , 实际工作开发中需要更加详尽的技术方案

- [学习Node.js开发server端的前置知识](https://blog.csdn.net/Brannua/article/details/105087923)

- 快速启动项目

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

- 需求 : 博客系统基本功能的后端部分

  - 登录功能 : 登录页

  - 获取博客列表功能 : 首页 + 作者主页 + 搜索框

  - 查看博客详情 : 博客详情页

  - 撰写博客功能 : 新建页

  - 更新博客功能 : 编辑页

  - 删除博客功能 : 删除按钮

- 技术方案

  - 接口设计( 原则 : 路由和数据处理分离 )

    | 描述         | 接口             | 方法 | 参数                          | 备注                     |
    | :----------- | :--------------- | :--- | :---------------------------- | :----------------------- |
    | 登录         | /api/user/login  | post |                               | postData中有用户名和密码 |
    | 获取博客列表 | /api/blog/list   | get  | author作者, keyword搜索关键字 | 参数为空则不进行查询过滤 |
    | 查看博客详情 | /api/blog/detail | get  | id                            |                          |
    | 新增一篇博客 | /api/blog/new    | post |                               | post中有新增的信息       |
    | 更新一篇博客 | /api/blog/update | post | id                            | postData中有更新的内容   |
    | 删除一篇博客 | /api/blog/del    | post | id                            |                          |

  - 数据存储( 考虑网站数据的特点 )

    - 数据量很大内存条成本高

    - 数据需要被持久化保存

    - 数据被操作的频率不是很高

    - [关系型硬盘数据库Mysql的下载方式](https://blog.csdn.net/Brannua/article/details/105014296)

    - [SQL语句的基本操作](https://blog.csdn.net/Brannua/article/details/104652438)

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

  - 登录功能( 登录信息存储 &&　登录校验 )

    - cookie的特点

      - 存储于浏览器的结构化字符串，最大５kb，跨域不共享

      - 浏览器查看cookie的三种方式 : 1.Application/Storage/Cookies 2.Network/Headers 3.document.cookie

      - 前端每次发送http请求，都会将请求域的cookie一起发送给server( 比如百度请求淘宝，百度就会发送淘宝的cookie )

    - server端nodejs操作cookie实现登录验证的大致思路如下

      - 首先前端调用/api/user/login接口进行登录

      - 当后端接收到登录请求，就会从请求的参数中解析出用户名和密码，和数据库校验通过登陆成功后，后端向前端设置cookie

      - 当前端向验证登录的接口发送请求时就会携带cookie，后端接收到cookie就可以根据cookie中的数据判断登录状态

      ```
        // 辅助函数 : 获取cookie的过期时间
        const _getCookieExpires = () => {
          const d = new Date();
          d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
          return d.toGMTString();
        }
        /**后端给前端设置cookie的演示示例
         * path=/ : 让前端项目的所有页面都是登录状态
         * httpOnly : 不允许前端通过js修改该cookie
         * expires : cookie的过期时间
         */    
        res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${_getCookieExpires()}`);
      ```

      - 只使用cookie实现登录验证有两处不足

        - cookie的可存储数据量十分有限，最大5kb

        - 不能在cookie中存放十分重要的用户信息，否则会泄露用户个人信息

      - 使用session的方式解决如上两处不足的思路

        - 浏览器端cookie中包含用户唯一标识userId

        - 用户信息保存到server端的session中

        - 默认不需要给客户端设置cookie ```let needSetCookie = false```

        - server端尝试获取cookie中的userId

          - 如果从cookie中解析出userId，再尝试依据此userId从session中获取用户信息

            - 如果未从session中获取到用户信息，则初始化```session[userId]```为空对象

          - 如果从cookie中没有解析出userId
            
            - needSetCookie设置为true　＆　生成唯一标识userId　＆　初始化```session[userId]```为空对象

            - 请求命中接口向前端返回数据的前一刻向前端设置包含userId的cookie

        - 将```session[userId]```挂到req.session上

        - 调用登录接口登陆成功的回调函数中将用户信息保存到req.session中

      - 但此时session只是一个存放在nodejs进程中的js变量，会有如下缺陷

        - 进程内存有限，如果访问量过大内存暴增，进程容易挂掉

        - 项目正式上线是多进程运行，进程之间内存无法共享

      - 考虑session的特点

        - session数据量不会很大

        - session数据的丢失只需要登录以下就可以恢复，可以不用持久化保存

        - session放在所有访问的入口中( index.js )，被访问频繁，对性能要求极高

      - 解决缺陷的方案 : 将session存储于redis，以拆分成独立服务

        - [redis基本操作 & nodejs连接redis总结](https://blog.csdn.net/Brannua/article/details/105068265)

        - redis将数据存放在内存中，内存的读写速度快，价格昂贵，数据非持久化保存

        - 将server、redis、mysql拆分成三个独立的服务，均可扩展( 例如都可扩展为集群 )

    - 和前端联调

      - 登录功能依赖cookie，需要使用浏览器

      - 前后端运行在不同端口，存在跨域无法共享cookie的问题

      - nginx : 高性能web服务器，开源免费，一般用于做静态服务和负载均衡( 本项目未使用到 )

      - 本项目使用nginx配置反向代理，让前后端监听同一端口实现同域联调

        - 比如http://localhost:8800/index.html会被代理到http://localhost:8001/index.html

        - 比如http://localhost:8800/api/blog/list会被代理到http://localhost:8000/api/blog/list

        - 安装nginx参考 : [CSDN博客](https://blog.csdn.net/CSDN_FlyYoung/article/details/94591864)

        ```
          # 启动

          nginx

          # 测试配置文件格式是否正确

          nginx -t

          # 重启

          nginx -s reload

          # 停止

          nginx -s stop
        ```
        ```
          # 查看和配置nginx的配置

          cd /usr/local/nginx/conf

          vim nginx.conf

          # 修改nginx配置反向代理

          worker_processes <主机核心数>;

          location / {
              proxy_pass http://localhost:8001;
          }

          location /api/ {
              proxy_pass http://localhost:8000;
              proxy_set_header Host $host; 
          }
        ```

  - 日志记录

    - 日志不需要表结构 & 不涉及级联查询等复杂场景 & 文件方便共享

    - 所以日志存储于文件 : [Node.js文件操作基础点此](https://blog.csdn.net/Brannua/article/details/105139779)

      - 访问日志 access log，是server端最重要的日志

      - 自定义日志，包括自定义事件，错误记录等

    - [使用stream的方式进行服务端文件操作的原因点此](https://blog.csdn.net/Brannua/article/details/105141050)
    
    