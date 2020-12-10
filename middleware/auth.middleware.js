const errorTypes = require('../constant/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const {
  PUBLIC_KEY
} = require('../app/config')
const jwt = require('jsonwebtoken');
const {
  passwordEncrypt
} = require('../util/password-handle');

const verifyLogin = async (ctx, next) => {
  // 解析参数 获得用户名 密码参数
  const {
    username,
    password
  } = ctx.request.body
  // 判断用户名 密码是否为空
  if (!username || !password || username === "" || password === "") {
    // 抛出错误事件进行统一错误处理
    const error = new Error(errorTypes.USERNAME_OR_PASSWORD_ILLEGAL);
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户名是否存在
  const result = await userService.getUserByName(username);
  const user = result[0];
  ctx.user = user;
  if (!user) {
    // 用户不存在抛出错误事件进行统一错误处理
    const error = new Error(errorTypes.USERNAME_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 验证密码是否正确
  if (passwordEncrypt(password) !== user.password) {
    // 密码错误抛出错误事件进行统一错误处理
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx);
  }

  // 需要使用await等待下一个中间件create执行
  await next();


}

const verifyToken = async function (ctx, next) {
  console.log("验证token");
  // 获取token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  // 判断是否携带token
  if (!authorization) {
    // 无携带token
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  };

  try {
    // 验证token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    console.log("verifyToken", result);
    ctx.user = result;
    await next();
  } catch (err) {
    console.log("token错误");
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }


}

const verifyPermission = async function (ctx, next) {
  console.log("verifyPermission");
  try {
    // '/:commentId'从接口URL中得到commentId
    const [resourceKey] = Object.keys(ctx.params);
    // 从commentId拿到comment表名
    const tableName = resourceKey.replace("Id", "");

    const resourceId = ctx.params[resourceKey];

    const userId = ctx.user.id;
    const isPermission = await authService.checkPermission(tableName, resourceId, userId);
    console.log("verifyPermission" + isPermission);
    if (!isPermission) {
      console.log("未授权异常");
      throw new Error();
    }

    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNPEIMISSION);

    return ctx.app.emit('error', error, ctx);
  }


}

module.exports = {
  verifyLogin,
  verifyToken,
  verifyPermission
}