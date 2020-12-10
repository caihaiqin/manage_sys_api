const Router = require('koa-router');
const authMiddleware = require('../middleware/auth.middleware');
const {
  saveAvatarInfo,saveFileInfo
} = require('../controller/file.controller');
const {
  verifyToken
} = require('../middleware/auth.middleware');
const {
  avatarHandle,
  fileHandle,fileResize
} = require('../middleware/file.middleware');
const fileRouter = new Router({
  prefix: '/upload'
});
// 上传头像接口
fileRouter.post('/avatar', verifyToken, avatarHandle, saveAvatarInfo);
// 上传文件接口
fileRouter.post('/file', verifyToken, fileHandle,fileResize,saveFileInfo);



module.exports = fileRouter;