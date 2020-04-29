/**
 * @description 思考实现express中间件机制
 * @author Brannua
 */

const slice = Array.prototype.slice
const http = require('http')

class myExpress {

  constructor() {
    this._routes = {
      useArr: [], // 收集use注册的中间件
      getArr: [], // 收集get注册的中间件
      postArr: [], // 收集post注册的中间件
    }
  }

  // 注册中间件的方法
  _register(){
    let path = arguments[0]
    if (typeof path !== 'string') {
      path = '/'
    }
    
    let stack = slice.call(arguments)
    if (typeof stack[0] === 'string') {
      stack.shift()
    }

    return {path, stack}
  }
  
  // use API
  use() {
    const res = this._register(...arguments)  // 注册中间件
    this._routes.useArr.push(res)             // 收集中间件
  }

  // get API
  get() {
    const res = this._register(...arguments)  // 注册中间件
    this._routes.getArr.push(res)             // 收集中间件
  }

  // post API
  post() {
    const res = this._register(...arguments)  // 注册中间件
    this._routes.postArr.push(res)            // 收集中间件
  }

  // next机制执行中间件
  _execMiddleWares(req, res, curStack) {
    const next = () => {
      const middleWare = curStack.shift()
      if (middleWare) {
        middleWare(req, res, next)
      }
    }
    next()
  }

  // 匹配当前触发的中间件
  _match(url, method) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }

    let curArr = this._routes.useArr
    if (method === 'get') curArr = curArr.concat(this._routes.getArr)
    if (method === 'post') curArr = curArr.concat(this._routes.postArr)

    curArr.forEach(item => {
      if (url.indexOf(item.path) === 0) {
        stack = stack.concat(item.stack)
      }
    })
    return stack
  }
  
  // 主业务逻辑
  _callback(req, res) {
    const url = req.url                       // 获取请求url
    const method = req.method.toLowerCase()   // 获取请求method

    let curStack = this._match(url, method)   // 匹配当前触发的中间件
    this._execMiddleWares(req, res, curStack) // next机制执行中间件

    // json API
    res.json = (data) => {
      res.setHeader('Content-type', 'application/json')
      res.end(
        JSON.stringify(data)
      )
    }
  }
  
  // listen API
  listen() {
    const server = http.createServer(this._callback.bind(this))
    server.listen(...arguments)
  }
}

module.exports = () => {
  return new myExpress()
}
