const Router = require('koa-router');

const {
  verifyUser,
  passwordHandle
} = require('../middleware/user.middleware');

const {
  create,
  avatarInfo
} = require('../controller/user.controller');

const userRouter = new Router({
  prefix: "/user"
});

// 在创建用户前使用verifyUser中间件对用户名 密码进行格式验证
// passwordHandle对密码进行加密
userRouter.post('/register', verifyUser, passwordHandle, create);
userRouter.get('/:userId/avatar', avatarInfo);
module.exports = userRouter;