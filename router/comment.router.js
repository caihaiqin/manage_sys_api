const {
  listenerCount
} = require('koa');
const Router = require('koa-router');
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller');
const {
  verifyToken,
  verifyPermission
} = require('../middleware/auth.middleware');
const commentRouter = new Router({
  prefix: '/comment'
});
// 发表评论
commentRouter.post('/', verifyToken, create);
// 回复评论
commentRouter.post('/:commentId/reply', verifyToken, reply);
// 修改评论
commentRouter.patch('/:commentId', verifyToken, verifyPermission, update);
// 删除评论
commentRouter.delete('/:commentId', verifyToken, verifyPermission, remove);
// 根据动态Id获取评论列表
commentRouter.get('/', list);




module.exports = commentRouter;