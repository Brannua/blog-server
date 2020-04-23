/**
 * @description 定义返回数据的格式
 * @author Brannua
 */

// 基类
class BaseModel {
  constructor(data, message) {
    if (typeof(data) === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

// 成功数据格式
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

// 失败数据格式
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
