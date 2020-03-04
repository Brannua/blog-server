const execSQL = require('../db/mysql');

// author和keyword都可用于条件查询 , 不定参
const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1';
  if (author) {
    sql += ` and author='${author}'`;
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`;
  }
  sql += ' order by createtime desc;';
  // 返回Promise对象
  return execSQL(sql);
}

const getDetail = (id) => {
  let sql = `select * from blogs where id=${id}`;
  return execSQL(sql).then(rows => {
    return rows[0];
  });
}

const newBlog = (blogData = {}) => {
  const title = blogData.title,
    content = blogData.content,
    createtime = Date.now(),
    author = blogData.author;

  const sql = `
    insert into blogs ( title, content, createtime, author )
    values ( '${title}', '${content}', ${createtime}, '${author}' )
  `;

  return execSQL(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  });
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