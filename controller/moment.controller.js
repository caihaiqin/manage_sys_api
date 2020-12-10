const labelRouter = require('../router/label.router');
const {
  addmoment,
  getmomentById,
  getmomentList,
  updatemoment,
  removeMoment,
  addLabels,
  hasLabel
} = require('../service/moment.service')
class MomentController {
  async create(ctx, next) {
    // 获取user_id content评论内容
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    console.log("添加评论获取获取user_id content评论内容", userId, content);
    if (!content) {
      return ctx.body = "评论内容不能为空";
    }
    const result = await addmoment(userId, content);
    ctx.body = "评论成功";
  }

  async detail(ctx, next) {
    // 获取评论ID
    const momentId = ctx.params.momentId;
    // console.log(momentId);
    const result = await getmomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const {
      offset,
      size
    } = ctx.query;

    const result = await getmomentList(offset, size);
    ctx.body = result;
  }
  async update(ctx, next) {
    console.log("更新动态");
    try {
      // 获取参数
      const momentId = ctx.params.momentId;
      const content = ctx.request.body.content;
      // 更新评论
      const result = await updatemoment(momentId, content);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async remove(ctx, next) {
    console.log("删除动态");
    try {
      // 获取参数
      const momentId = ctx.params.momentId;

      // 删除动态
      const result = await removeMoment(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async addLabels(ctx, next) {

    console.log("动态添加标签");
    try {
      const labels = ctx.labels;
      const {
        momentId
      } = ctx.params;
      for (const label of labels) {
        // 先判断标签是否跟动态已经有关联
        const isRelevance = await hasLabel(momentId, label.id);
        if (!isRelevance) {
          console.log(label.name + "不存在关联");
          const result = await addLabels(label.id, momentId);
        }

      }

      ctx.body = labels;

    } catch (error) {

    }
  }
}

module.exports = new MomentController();