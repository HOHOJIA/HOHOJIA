const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  addComment: async (newCommentObj) => {
    const connection = connectionPromise;
    try {
      const { userId, recipeId, replyCommentId, content } = newCommentObj;
      const addCommentQuery =
        "INSERT INTO recipecomments (userId, recipeId, replyCommentId, content) VALUES(?,?,?,?)";
      const [result] = await connection.execute(addCommentQuery, [
        userId,
        recipeId,
        replyCommentId,
        content,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  checkComment: async (insertId) => {
    const connection = connectionPromise;
    try {
      const checkQuery =
        "select  r.id as commentId, r.userId, u.name as username , r.recipeId, r.replyCommentId, r.content , r.time from users as u inner join recipecomments as r on u.id = r.userId where r.id=?";
      const [result] = await connection.execute(checkQuery, [insertId]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
