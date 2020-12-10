const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');

const {
  useRoutes
} = require('../router/index')


const {
  errorHandle
} = require('../app/error-handle')



app.useRoutes = useRoutes; //自动注册路由 
app.use(bodyparser());
// app.use(userRouter.routes());
app.useRoutes();
app.on('error', errorHandle);

module.exports = app;