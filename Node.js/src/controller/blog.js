const getList = (author, keyword) => {
  // 先返回假数据 , 但保证数据格式正确
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createtime: 1583235890017,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createtime: 1583235932036,
      author: 'lisi'
    }
  ]
}

module.exports = {
  getList
}
