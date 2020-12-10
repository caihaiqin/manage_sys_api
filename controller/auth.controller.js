const {
  PRIVATE_KEY
} = require('../app/config')
const jwt = require('jsonwebtoken');

class authController {
  async login(ctx, next) {
    // 获取用户名密码
    const {
      id,
      username,
      password
    } = ctx.user;
    const token = jwt.sign({
      id,
      username,
      password
    }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256"
    })

    ctx.body = {
      username,
      password,
      token
    };
  }

  async authSuccess(ctx, next) {
    // ctx.body = "authSuccess";
    console.log("authSuccess");
    ctx.body = "验证成功";
  }
};

module.exports = new authController();