const path = require('path');
const avatarMulter = require('koa-multer');
const fileMulter = require('koa-multer');
const jimp = require('jimp');

const {
  AVATAR_PATH,
  FILE_PATH
} = require('../constant/file-types');


const avatarUpload = avatarMulter({
  dest: AVATAR_PATH
})
const fileUpload = fileMulter({
  dest: FILE_PATH
})

const avatarHandle = avatarUpload.single("avatar");
const fileHandle = fileUpload.array('file', 9);

const fileResize = async function (ctx, next) {
  console.log("保存不同尺寸图片");
  const files = ctx.req.files;
  try {
    for (const file of files) {
      const filePath = path.join(FILE_PATH, file.filename);
      console.log(filePath);
      jimp.read(filePath).then(image => {

        image.resize(1280, jimp.AUTO).write(`${filePath}-large`);
        image.resize(640, jimp.AUTO).write(`${filePath}-middle`);
        image.resize(320, jimp.AUTO).write(`${filePath}-small`);

      })
    }
    await next();
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  avatarHandle,
  fileHandle,
  fileResize
};