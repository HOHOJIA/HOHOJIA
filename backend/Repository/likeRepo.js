const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  addLike: async (likeObj) => {
    const connection = connectionPromise;
    try {
      const { userId, recipeId, createdAt } = likeObj;
      const likeQuery =
        "INSERT INTO likes (userId, recipeId, createdAt) VALUES(?,?,?)";
      const [result] = await connection.execute(likeQuery, [
        userId,
        recipeId,
        createdAt,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
