const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog');

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel');


const handleBlogRouter = (req, res) => {
  const method = req.method,
    path = req.path,
    id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || '',
      keyword = req.query.author || '';
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(id);
    return new SuccessModel(data);
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogData = req.body,
      data = newBlog(blogData);
    return new SuccessModel(data);
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const blogData = req.body,
      result = updateBlog(id, blogData);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('更新博客失败');
    }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const result = delBlog(id);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('删除博客失败');
    }
  }

}

module.exports = handleBlogRouter;