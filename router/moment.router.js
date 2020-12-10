const Router = require('koa-router');
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels
} = require('../controller/moment.controller')
const {
  verifyLabelsExists
} = require('../middleware/label.middleware');
const {
  verifyToken,
  verifyPermission
} = require('../middleware/auth.middleware')
const momentRouter = new Router({
  prefix: '/moment'
});

// 发表动态
momentRouter.post('/add', verifyToken, create);
// 获取动态列表
momentRouter.get('/', list);
// 根据动态ID获取动态详情
momentRouter.get('/:momentId', detail);
// 修改动态接口 先验证是否登录  在验证是否有权限
momentRouter.patch('/:momentId', verifyToken, verifyPermission, update);
// 删除动态接口 先验证是否登录  在验证是否有权限
momentRouter.delete('/:momentId', verifyToken, verifyPermission, remove);
// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyToken, verifyPermission, verifyLabelsExists, addLabels);

module.exports = momentRouter;