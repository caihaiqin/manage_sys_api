const errorTypes = require('../constant/error-types');
const userService = require('../service/user.service');
const {
  passwordEncrypt
} = require('../util/password-handle')

const verifyUser = async (ctx, next) => {
  // 解析参数 获得用户名 密码参数
  const {
    username,
    password
  } = ctx.request.body
  // 判断用户名 密码是否为空
  if (!username || !password || username === "" || password === "") {
    // 抛出错误事件进行统一错误处理
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否已经被注册
  const result = await userService.getUserByName(username);
  if (result.length) {
    // 抛出错误事件进行统一错误处理
    const error = new Error(errorTypes.USERNAME_OREADLY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 需要使用await等待下一个中间件create执行
  await next();


}
// 密码加密
const passwordHandle = async (ctx, next) => {
  let {
    password
  } = ctx.request.body;
  ctx.request.body.password = passwordEncrypt(password);
  console.log(ctx.request.body.password);
  await next();
}

module.exports = {
  verifyUser,
  passwordHandle
};