const errorTypes = require('../constant/error-types')

const errorHandle = (error, ctx) => {
  switch (error.message) {
    case errorTypes.USERNAME_OR_PASSWORD_ILLEGAL:
      status = 400;
      message = "用户名或密码为空"
      break;
    case errorTypes.USERNAME_OREADLY_EXISTS:
      status = 409; //conflict 冲突
      message = "用户名已存在"
      break;
    case errorTypes.USERNAME_DOES_NOT_EXISTS:
      status = 400; //bad request 
      message = "用户不存在"
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400; //bad request
      message = "密码错误"
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; //unauthorization
      message = "token无效--"
      break;
    case errorTypes.UNPEIMISSION:
      status = 401; //unauthorization
      message = "您没有权限"
      break;
    case errorTypes.INVALID_PARAMETER:
      status = 402; //payment required
      message = "无效参数"
      break;

    default:
      status = 404;
      message = "系统错误"
      break;
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = {
  errorHandle
}