const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  addComment: async (newCommentObj) => {
    const connection = connectionPromise;
    try {
      const { userId, recipeId, replyCommentId, content, time } = newCommentObj;
      const addCommentQuery =
        "INSERT INTO recipecomments (userId, recipeId, replyCommentId, content, time) VALUES(?,?,?,?,?)";
      const [result] = await connection.execute(addCommentQuery, [
        userId,
        recipeId,
        replyCommentId,
        content,
        time,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
