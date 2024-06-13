const errorMsg = require("../../../../../utils/errorMsg");
const searchService = require("../../../../../Service/searchService");
const searchRes = require("./searchRes");
const redisClient = require("../../../../../utils/cache").redisClient;

module.exports = {
  handle: async (res, type, keyword) => {
    const searchResult = await searchService.search(res, type, keyword);
    if (searchResult.length != 0) {
      try {
        await redisClient.set(
          keyword,
          JSON.stringify(searchResult),
          { EX: 3600 }
        );
      } catch (err) {
        console.error("Redis setEx error:", err);
      }
    }
    if (!searchResult || searchResult.length === 0) {
      return errorMsg.notFound(res);
    }
    let response = await searchRes.customize(searchResult);
    return response;
  },
};
