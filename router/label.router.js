const Router = require('koa-router');

const {
  verifyToken
} = require('../middleware/auth.middleware');
const {
  create
} = require('../controller/label.controller');
const labelRouter = new Router({
  prefix: '/label'
});

labelRouter.post('/', verifyToken, create);

module.exports = labelRouter;