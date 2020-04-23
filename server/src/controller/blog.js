/**
 * @description controller blog
 * @author Brannua
 */

const xss = require('xss')
const {execSQL} = require('../db/mysql')

/**
 * 查询博客列表，author和keyword都可用于条件查询，不定参
 * @param {string} author author
 * @param {string} keyword keyword
 */
const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1'
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ' order by createtime desc;'
  // 返回Promise对象
  return execSQL(sql)
}

/**
 * 获取博客详情
 * @param {string} id id
 */
const getDetail = (id) => {
  let sql = `select * from blogs where id=${id}`
  return execSQL(sql).then(rows => {
    return rows[0]
  })
}

/**
 * 新建博客
 * @param {object} blogData blogData
 */
const newBlog = (blogData = {}) => {
  const createtime = Date.now()
  const {title, content, author} = blogData

  title = xss(title)
  content = xss(content)

  const sql = `
    insert into blogs ( title, content, createtime, author )
    values ( '${title}', '${content}', ${createtime}, '${author}' )
  `

  return execSQL(sql).then(insertData => {
    const { insertId: id } = insertData
    return { id }
  })
}

/**
 * 更新博客
 * @param {string} id id
 * @param {object} blogData blogData
 */
const updateBlog = (id, blogData = {}) => {
  const {title, content} = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  return execSQL(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

/**
 * 删除博客
 * @param {string} id id
 * @param {string} author author
 */
const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`

  return execSQL(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
