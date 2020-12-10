const pool = require('../app/database');

class CommentService {

  async addComment(momentId, id, content) {
    console.log("添加评论到数据库");
    console.log(id);
    try {
      const statement = `
          INSERT INTO comment (moment_id,user_id,content) VALUES (?,?,?);
        `;
      const [result] = await pool.execute(statement, [momentId, id, content]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }

  }
  async replyComment(commentId, momentId, id, content) {
    console.log("对评论进行评论");
    try {
      const statement = `
        INSERT INTO comment (comment_id,moment_id,user_id,content) VALUES (?,?,?,?);
      `;
      const [result] = await pool.execute(statement, [commentId, momentId, id, content]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async updateComment(commentId, content) {
    try {
      const statement = `
          UPDATE  comment SET content = ? WHERE id = ?;
          
        `;
      const [result] = await pool.execute(statement, [content, commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async removeComment(commentId) {
    try {
      const statement = `
          DELETE FROM comment WHERE id = ?;
        `;
      const [result] = await pool.execute(statement, [commentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getCommentsByMomentId(momentId) {
    console.log(momentId);
    try {
      const statement = `
          SELECT c.id id, c.content content,c.createAt createTime,c.updateAt updateTime ,
            JSON_OBJECT("id",u.id,"name",u.username) user
            FROM comment c 
            LEFT JOIN users u ON c.user_id=u.id 
            WHERE moment_id = 1;
        `;
      const [result] = await pool.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommentService();