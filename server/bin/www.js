const http = require('http'),
  serverHandle = require('../app'),
  PORT = 8000;

http.createServer(serverHandle).listen(PORT, () => {
  console.log(`running at port ${PORT}.`);
});
