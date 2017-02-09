//引入模块
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serverstatic = require('serve-static');
var logger = require('morgan');
var cookieParser = require('cookie-parser');


// var routes = require('./routes');
// var users = require('./routes/users');


//设置views路径和模板
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
console.log("---"+__dirname);
//app.use配置
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(serverstatic(__dirname + '/public'));
app.use(logger);
//加载路由
// app.use('/', routes);
// app.use('/users', users);
//错误处理
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


//区分产品环境和开发环境
if('development'===app.get('env')){
  app.use(function(err, req, res, next) {
  // 业务逻辑
});
}
if('production'===app.get('env')){
  app.use(function(err, req, res, next) {
  // 业务逻辑
});
}


//路由和request的处理
//.. 处理get请求
app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

//..处理post请求 还有app.all()处理所有请求
app.post('/add', function(req,res){
  res.render('add', {
    sum: req.body.a + req.body.b
  });
});

//添加listen，启动nodejs服务器
const server = app.listen(3000, 'localhost', function () {
  const host = server.address().address
  const port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
