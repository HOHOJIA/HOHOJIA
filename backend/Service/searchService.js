const searchRepo = require("../Repository/searchRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
const redisClient = require("../utils/cache").redisClient;

module.exports = {
  search: async (res, type, keyword) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      let searchResult;
      await connection.beginTransaction();
      if (type === "title") {
        searchResult = await searchRepo.searchByTitle(keyword);
        try {
          await redisClient.setEx(keyword, 3600, JSON.stringify(searchResult));
        } catch (err) {
          console.error("Redis setEx error:", err);
        }
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
