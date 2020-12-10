const pool = require('../app/database');

class LabelService {
  async create(labelName) {
    console.log("添加标签");
    try {
      const statement = `INSERT INTO labels (name) VALUES (?);`;
      const result = await pool.execute(statement, [labelName]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getLabelByName(label) {
    try {
      const statement = `
      SELECT * FROM labels Where name = ?;
        `;
      const [result] = await pool.execute(statement, [label]);
      
      return result[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LabelService();