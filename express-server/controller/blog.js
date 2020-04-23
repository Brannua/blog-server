/**
 * @description controller blog
 * @author Brannua
 */

const xss = require('xss')
const {execSQL} = require('../db/mysql')

// author和keyword都可用于条件查询 , 不定参
const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1'
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ' order by createtime desc'
  // 返回Promise对象
  return execSQL(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id=${id}`
  return execSQL(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title),
    content = blogData.content,
    createtime = Date.now(),
    author = blogData.author

  const sql = `
    insert into blogs ( title, content, createtime, author )
    values ( '${title}', '${content}', ${createtime}, '${author}' )
  `

  return execSQL(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title,
    content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `

  return execSQL(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`

  return execSQL(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}
