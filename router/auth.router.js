const Router = require('koa-router');
const {
  login,authSuccess
} = require('../controller/auth.controller')
const {
  verifyLogin,
  verifyToken
} = require('../middleware/auth.middleware')
const authRouter = new Router({
  prefix: '/user'
});

authRouter.post('/login', verifyLogin, login);
authRouter.post('/test', verifyToken, authSuccess);

module.exports = authRouter;