# 使用koa2框架对原生blog-server的重构版本

- express 中间件是异步回调
- koa2天生支持async/await，是以类似同步的写法处理异步任务的语法糖

  - async/await基于promise
    - async函数的执行返回promise对象
    - await包裹在async函数中，后面追加promise对象

  - await获取resolve的数据
  - 可以用try-catch获取reject的数据

  ```
    async function demo() {
      try {
        
        var aData = await getFile('a.txt');
        console.log('a data', aData);
        var bData = await getFile(aData.next);
        console.log('b data', bData);
        var cData = await getFile(bData.next);
        console.log('c data', cData);

      } catch(err) {
        console.log(err);
      }
    }

    async function test() {
      const res = await demo();
      console.log(res);
    }

    test();
  ```