const pool = require('../app/database');

class AuthService {
  async checkPermission(tableName, resourceId, userId) {
    try {
      const statement = `
    SELECT user_id from ${tableName} WHERE id = ? AND user_id = ?;
`;
      const [result] = await pool.execute(statement, [resourceId, userId]);
      console.log(result.length);
      return result.length === 0 ? false : true;
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = new AuthService();