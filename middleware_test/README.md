# express中间件机制 & 原理分析

- 中间件用法参见./app.js

- 实现中间件机制的需求分析

  - 实现中间件机制的接口

    - app.listen(PORT, callback);

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

  - 注册的中间件需要收集起来

  - 实现遇到http请求, 根据path和method判断触发哪些中间件的机制

  - 实现中间件机制的next()机制
