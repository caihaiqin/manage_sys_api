const labelService = require('../service/label.service');
const {
  INVALID_PARAMETER
} = require('../constant/error-types')
class LabelController {
  async create(ctx, next) {
    try {
      const {
        labelName
      } = ctx.request.body;
      console.log(labelName);
      if (!labelName) {
        const error = new Error(INVALID_PARAMETER);

        return ctx.app.emit('error', error, ctx);
      }
      const result = await labelService.create(labelName);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = new LabelController();