var express = require('express'),
  app = express(),
  logger = require('morgan'),
  
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  RedisStore = require('connect-redis')(session),
  redisClient = require('./db/redis'),
  sessionStore = new RedisStore({
    client: redisClient
  }),
  
  blogRouter = require('./routes/blog'),
  userRouter = require('./routes/user'),

  createError = require('http-errors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'Wa&3_asR&*#-as34',
  cookie: {
    // path: '/',      // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore
}));

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
