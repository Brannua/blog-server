
const serverHandel = (req, res) => {
  // 设置返回字符串数据的格式为json
  res.setHeader('Content-type', 'application/json');
  // 定义返回的数据
  const resData = {
    name: 'lpj',
    age: 18,
    env: process.env.NODE_ENV,
  }
  // 返回数据
  res.end(JSON.stringify(resData));
}

module.exports = serverHandel;
