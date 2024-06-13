const searchRepo = require("../Repository/searchRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;

module.exports = {
  search: async (res, type, keyword) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      let searchResult;
      await connection.beginTransaction();
      if (type === "title") {
        console.log("title");
        searchResult = await searchRepo.searchByTitle(keyword);
      } else if (type === "tag") {
        searchResult = await searchRepo.searchByTag(keyword);
      }
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
