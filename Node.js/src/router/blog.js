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
      keyword = req.query.keyword || '';
    return getList(author, keyword).then(listData => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(id).then(data => {
      return new SuccessModel(data);
    });
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogData = req.body;
    blogData.author = 'lisi'; // 假作者,待开发登录功能时再修改
    return newBlog(blogData).then(data => {
      return new SuccessModel(data);
    });
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const blogData = req.body;
    return updateBlog(id, blogData).then(value => {
      if (value) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    });
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const author = 'zhangsan'; // 假作者,待开发登录功能时再修改
    return delBlog(id, author).then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('删除博客失败');
      }
    });
  }

}

module.exports = handleBlogRouter;