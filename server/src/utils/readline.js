/**
 * 分析日志模块
*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log');

// 创建readline对象( 基于stream )
const readStream = fs.createReadStream(fileName);
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0,
  totalNum = 0;

// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  // 记录总行数
  totalNum ++;

  const arr = lineData.split(' -- ');
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    // 记录chrome的数量
    chromeNum ++;
  }
});

// 监听读取完成
rl.on('close', () => {
  console.log('Chrome占比 :', chromeNum / totalNum);
});
