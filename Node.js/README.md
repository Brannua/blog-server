# 博客项目后端部分

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

  - Mysql数据存储( 关系型硬盘数据库 )

    - [Mysql下载链接](https://dev.mysql.com/downloads/mysql/)

    - [Workbench下载链接](https://dev.mysql.com/downloads/workbench/)

    - [SQL语句的的基本使用](https://blog.csdn.net/Brannua/article/details/104652438)

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
      - 首先前端调用/api/user/login接口进行登录
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

    - session && session写入内存数据库redis

    - 开发登录功能 && 使用nginx反向代理和前端联调

