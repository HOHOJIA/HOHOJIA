const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  addLike: async (likeObj) => {
    const connection = connectionPromise;
    try {
      const { userId, recipeId } = likeObj;
      const likeQuery = "INSERT INTO likes (userId, recipeId) VALUES(?,?)";
      const [result] = await connection.execute(likeQuery, [userId, recipeId]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteLike: async (likeObj) => {
    const connection = connectionPromise;
    try {
      const { userId, recipeId } = likeObj;
      const deleteLikeQuery =
        "DELETE FROM likes WHERE userId = ? and recipeId = ?";
      const [result] = await connection.execute(deleteLikeQuery, [
        userId,
        recipeId,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  },
  checkLikeById: async (userId, recipeId) => {
    const connection = connectionPromise;
    try {
      const checkQuery =
        "SELECT * FROM likes WHERE userId = ? and recipeId = ?";
      const [result] = await connection.execute(checkQuery, [userId, recipeId]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
