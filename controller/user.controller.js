const userService = require('../service/user.service');
const fs = require('fs');
const {
  AVATAR_PATH
} = require('../constant/file-types');
const {
  getAvatarByUserId
} = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    // 解析参数
    const userInfo = ctx.request.body
    console.log(ctx.request.body);
    // 插入数据库
    const result = await userService.create(userInfo);

    console.log("用户创建成功");
    ctx.body = `${userInfo.username}创建成功`;
  }
  async avatarInfo(ctx, next) {
    // 获取用户ID
    try {
      const {
        userId
      } = ctx.params;
      const result = await getAvatarByUserId(userId);
    //  设置response类型 
      ctx.response.set({
        "content-type": result.mimetype
      })
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
 
    } catch (error) {
      console.log(error);
    }

  }
};

module.exports = new UserController();