
const execSQL = require('../db/mysql');

// author和keyword都可用于条件查询 , 不定参
const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1';
  if (author) {
    sql += ` and author='${author}'`;
  }
  if (keyword) {
    sql += ` and keyword='${keyword}'`;
  }
  sql += ' order by createtime desc;';
  // 返回Promise对象
  return execSQL(sql);
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
