const {
  addComment,
  replyComment,
  updateComment,
  removeComment,
  getCommentsByMomentId
} = require('../service/comment.service');


class CommentController {
  async create(ctx, next) {
    console.log("创建评论");
    // 获取用户ID  评论内容
    try {
      const {
        id
      } = ctx.user;
      const {
        content,
        momentId
      } = ctx.request.body;
      console.log(id);
      const result = await addComment(momentId, id, content);
      ctx.body = result;

    } catch (error) {
      console.log(error);
    }
  }
  async reply(ctx, next) {
    console.log("回复评论");
    // 获取用户ID  评论内容
    try {
      const {
        id
      } = ctx.user;
      const {
        content,
        momentId
      } = ctx.request.body;
      const {
        commentId
      } = ctx.params;
      console.log(id);
      const result = await replyComment(commentId, momentId, id, content);
      ctx.body = result;

    } catch (error) {
      console.log(error);
    }
  }

  async update(ctx, next) {
    console.log("更新评论");
    try {
      // 获取参数
      const commentId = ctx.params.commentId;
      const content = ctx.request.body.content;
      // 更新评论
      const result = await updateComment(commentId, content);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(ctx, next) {
    try {
      // 获取参数
      const commentId = ctx.params.commentId;

      // 更新评论
      const result = await removeComment(commentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async list(ctx, next) {
    console.log("获取某条动态的评论列表");
    try {
      const momentId = ctx.query.momentId;
      const result = await getCommentsByMomentId(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentController();