const {
  createAvatar,
  createFile

} = require('../service/file.service');
const {
  updateAvatarUrlById
} = require('../service/user.service');
const {
  AVATAR_PATH
} = require('../constant/file-types');

class FileController {

  async saveAvatarInfo(ctx, next) {
    console.log(ctx.req.file);
    try {
      const {
        mimetype,
        filename,
        size
      } = ctx.req.file;
      const {
        id
      } = ctx.user;
      // 将图像信息保存到数据库中
      const avatarInfo = await createAvatar(mimetype, filename, id, size);
      // 将图片地址保存到users表中
      const avatarUrl = `${AVATAR_PATH}/${filename}`;
      // 更新用户头像地址
      const result = await updateAvatarUrlById(avatarUrl, id);
      ctx.body = {
        stateCode: 1,
        message: "上传成功"
      };
    } catch (error) {
      console.log(error);
    }

  }

  async saveFileInfo(ctx, next) {
    console.log("保存上传文件信息");
    try {
      // 获取参数
      const {
        momentId
      } = ctx.query;
      console.log(momentId);
      const {
        id
      } = ctx.user;
      const files = ctx.req.files;
      console.log(files);
      for (const file of files) {
        console.log(file.mimetype, file.filename, id, momentId, file.size);
        await createFile(file.mimetype, file.filename, id, momentId, file.size);
      }

      ctx.body = {
        statusCode: 1,
        mesage: "文件上传成功"
      }
    } catch (error) {

    }
  }
}

module.exports = new FileController();