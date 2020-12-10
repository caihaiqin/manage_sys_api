const pool = require('../app/database')


class UserService {
  async create(userInfo) {
    const {
      username,
      password
    } = userInfo;

    const statement = "INSERT INTO users (username,password) VALUES (?,?)"
    // 连接数据库

    const result = await pool.execute(statement, [username, password]);
    console.log("数据库创建用户", username);

    return result[0];
  }

  async getUserByName(username) {
    const statement = "SELECT * FROM users WHERE username = ?"
    // 连接数据库

    const result = await pool.execute(statement, [username]);
    console.log(result[0]);
    return result[0];
  }
  async getAvatarByUserId(userId) {
    try {
      const statement = `
      SELECT * FROM avatar WHERE user_id = ?;
      `;
      const [result] = await pool.execute(statement, [userId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    try {
      const statement = `
      UPDATE users SET avatar_url = ? WHERE id = ?;  
      `;
      const [result] = await pool.execute(statement, [avatarUrl, userId]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = new UserService();