const {
  getLabelByName,
  create
} = require('../service/label.service');
const verifyLabelsExists = async function (ctx, next) {
  console.log("验证标签是否存在");
  try {
    const {
      labels
    } = ctx.request.body;
    const newLabels = [];
    for (const name of labels) {
      const labelInfo = {
        name
      };
      // 判断是否存在标签
      const labelResult = await getLabelByName(name);
      if (!labelResult) {
        // 不存在先创建标签数据
        const [result] = await create(name);
        console.log(result);
        // 从result中获取创建后的label id 
        labelId = result.insertId;
        labelInfo.id = labelId;
      } else {

        labelInfo.id = labelResult.id;
      }
      newLabels.push(labelInfo);
    }
    console.log(newLabels);
    ctx.labels = newLabels;
    await next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  verifyLabelsExists
}