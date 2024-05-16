const commentRepo = require("../Repository/commentRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;

module.exports = {
  addComment: async (res, newCommentObj) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      await connection.beginTransaction();
      const insertResult = await commentRepo.addComment(
        newCommentObj,
        connection
      );
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
  checkComment: async (insertId) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      await connection.beginTransaction();
      const returnResult = await commentRepo.checkComment(insertId, connection);
      await connection.commit();

      return returnResult;
    } catch (error) {
      await connection.rollback();
      console.error(error);
    } finally {
      console.log("connection release");
      connection.release();
    }
  },
};
