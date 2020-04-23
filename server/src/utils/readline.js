/**
 * @description 分析日志模块
 * @author Brannua
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log') // 文件名

// 创建readline对象( 基于stream )
const readStream = fs.createReadStream(fileName)
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0 // 统计chrome用户量
let totalNum = 0  // 统计总用户量

// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return
  }

  // 统计总用户量
  totalNum ++

  // 统计chrome用户量
  const arr = lineData.split(' -- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum ++
  }
})

// 监听读取完成
rl.on('close', () => {
  console.log('Chrome用户占比 :', chromeNum / totalNum)
})
