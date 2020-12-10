const pool = require('../app/database');

class MomentService {
  async addmoment(userId, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES (? , ?) `;
    const result = await pool.execute(statement, [userId, content]);
    console.log(result);
    return result;

  }

  async getmomentById(momentId) {
    console.log("getmomentById" + momentId);
    try {
      const statement = `
      SELECT m.id id,m.content content,JSON_OBJECT("user_id",u.id,"username",u.username) user
FROM moment m 
LEFT JOIN users u ON m.user_id = u.id 
LEFT JOIN comment c ON c.moment_id = m.id 
WHERE m.id = ?;
      `
      const result = await pool.execute(statement, [momentId]);

      return result[0];
    } catch (error) {
      console.log(error);
    }

  }
  async getmomentList(offset, size) {
    console.log("getmomentList");
    try {
      const statement = `
            SELECT m.id,content,JSON_OBJECT("user_id",u.id,"username",u.username) user
            ,(SELECT COUNT(*) FROM comment where comment.moment_id = m.id) commentCount
        FROM moment m LEFT JOIN users u ON m.user_id = u.id 
        LIMIT ? ,?;
      `;
      const result = await pool.execute(statement, [offset, size]);

      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async updatemoment(momentId, content) {
    try {
      const statement = `
          UPDATE  moment SET content = ? WHERE id = ?;
          
        `;
      const [result] = await pool.execute(statement, [content, momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async removeMoment(momentId) {
    try {
      const statement = `
          DELETE FROM moment WHERE id = ?;
        `;
      const [result] = await pool.execute(statement, [momentId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async addLabels(labelId, momentId) {
    try {
      const statement = `
          INSERT INTO moment_label (moment_id , label_id) VALUES (? , ?);
      `;
      const [result] = await pool.execute(statement, [momentId, labelId]);

    } catch (error) {
      console.log(error);
    }
  }

  async hasLabel(momentId, labelId) {
    try {
      const statement = `
          SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
      `;
      const [result] = await pool.execute(statement, [momentId, labelId]);
      console.log(result);
      return result.length > 0 ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentService()