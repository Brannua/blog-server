# note

### 博客项目后端部分

- 以学习技术为目标

  - 开发博客系统的基本功能

    - 查看博客功能

    - 撰写博客功能

    - 管理博客功能

  - 用三种开发方式将后端部分写三遍

    - 原生Node.js

    - express.js

    - Koa2.js

- 需求

  - 首页 

  - 作者主页

  - 博客详情页

  - 登录页

  - 管理中心

    - 模糊查询

    - 新建页

    - 编辑页

----------------------------------------

- 技术方案

  > Tips : 本次秉着学习的目的 , 并没有将技术方案设计地十分详尽 , 实际工作开发中需要更加详尽的技术方案

  - 数据存储

    - 博客

      | id | title | content | createtime |  author  |
      |:--:|:-----:|:-------:|:----------:|:--------:|
      | 1  | 标题1 |  内容1  | 832764273  | zhangsan |
      | 2  | 标题2 |  内容2  | 374698139  |   lisi   |

    - 用户 : 密码可进行加密处理

      | id | username | password | realname |
      |:--:|:--------:|:--------:|:--------:|
      | 1  | zhangsan |   123    |   张三   |
      | 2  |   lisi   |   123    |   李四   |

  - 接口设计 , 与前端对接

    |        描述        |       接口       | 方法 |             参数              |           备注           |
    |:------------------:|:----------------:|:----:|:-----------------------------:|:------------------------:|
    |    获取博客列表    |  /api/blog/list  | get  | author作者, keyword搜索关键字 | 参数为空则不进行查询过滤 |
    | 获取一篇博客的内容 | /api/blog/detail | get  |              id               |                          |
    |    新增一篇博客    |  /api/blog/new   | post |                               |    post中有新增的信息    |
    |    更新一篇博客    | /api/blog/update | post |              id               |  postData中有更新的内容  |
    |    删除一篇博客    |  /api/blog/del   | post |              id               |                          |
    |        登录        | /api/blog/login  | post |                               | postData中有用户名和密码 |

  - 登录部分

    - 业界有统一的解决方案 , 一般不用重新设计

      - 使用原生Node.js实现较为复杂 , 但是可以了解原理

      - 使用Koa2或express实现较为简单 , 但通过API无法了解原理
