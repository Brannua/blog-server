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

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createtime: 1583235890017,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象, 包含title、content属性
  // 先返回假数据
  return {
    id: 3 // 表示新建博客插入到数据库表中的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // blogData是一个博客对象, 包含title、content属性
  // id 就是要更新的博客在数据库中的唯一标识
  // 先返回假数据
  return true;
}

const delBlog = (id) => {
  // id 就是要删除的博客在数据库中的唯一标识
  // 先返回假数据
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
