const router = require('koa-router')();

router.prefix('/api/blog');

router.get('/list', async (ctx, next) => {
  ctx.body = 'list';
});

router.get('/detail', async (ctx, next) => {
  ctx.body = 'detail';
});

// router.post('/new', loginCheck, async (ctx, next) => {

// });

// router.post('/update', loginCheck, async (ctx, next) => {

// });

// router.post('/del', loginCheck, async (ctx, next) => {

// });

module.exports = router;
