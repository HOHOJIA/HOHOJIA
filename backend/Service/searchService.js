const searchRepo = require("../Repository/searchRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;

module.exports = {
  searchByTitle: async (res, title) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      await connection.beginTransaction();
      const searchResult = await searchRepo.searchByTitle(title);
      await connection.commit();

      return searchResult;
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
