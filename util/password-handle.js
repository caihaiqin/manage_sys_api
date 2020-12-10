const crypto = require('crypto');

const passwordEncrypt = (password) => {
  const MD5 = crypto.createHash("md5");
  const result = MD5.update(password).digest('hex');
  return result;
}

module.exports = {
  passwordEncrypt
}