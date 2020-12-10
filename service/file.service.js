const pool = require('../app/database');

class FileService {
  async createAvatar(mimetype, filename, userId, size) {
    console.log(mimetype, filename, userId, size);
    try {
      const statement = ` 
          INSERT INTO avatar (mimetype,filename,size,user_id) VALUES (?,?,?,?);
      `;
      const [result] = await pool.execute(statement, [mimetype, filename, size, userId]);
      console.log(result);
      return result;

    } catch (error) {
      console.log(error);
    }
  }
  async createFile(mimetype, filename, userId, momentId, size) {
    try {
      const statement = `
      INSERT INTO file (mimetype,filename,user_id,moment_id,size) VALUES (?,?,?,?,?);
      `;
      const [result] = await pool.execute(statement, [mimetype, filename, userId, momentId, size]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileService();