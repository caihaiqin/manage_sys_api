const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"));
// 将环境变量添加到process
dotenv.config();

module.exports = {
  APP_PORT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD
} = process.env;

module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.PRIVATE_KEY = PRIVATE_KEY;