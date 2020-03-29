/**
 * 写日志模块
*/

const fs = require('fs');
const path = require('path');

/**
 * 辅助函数 : 生成writeStream
 * @param {String} fileName 文件名
*/
function _createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a',
  });
  return writeStream;
}

/**
 * 模块核心代码 : 写日志
 * @param {Object} writeStream destination
 * @param {String} log 日志内容
*/
function _writeLog(writeStream, log) {
  // 关键代码
  writeStream.write(log + '\n');
}

/**
 * API : 写访问日志access.log
*/
const accessWriteStream = _createWriteStream('access.log');
function access(log) {
  _writeLog(accessWriteStream, log);
}

module.exports = {
  access,
}
