const likeRepo = require("../Repository/likeRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;

module.exports = {
  like: async (res, likeObj) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      const checkResult = await likeRepo.checkLikeById(likeObj.userId);
      if (checkResult.length > 0) {
        return null;
      }
      await connection.beginTransaction();
      const insertResult = await likeRepo.addLike(likeObj, connection);
      await connection.commit();

      return insertResult;
    } catch (error) {
      await connection.rollback();
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
      connection.release();
    }
  },
};
