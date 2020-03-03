const http = require('http'),
  serverHandle = require('../index'),
  PORT = 3000;

http.createServer(serverHandle).listen(PORT, () => {
  console.log(`running at port ${PORT}.`);
});
