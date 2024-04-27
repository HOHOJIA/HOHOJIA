const errorMsg = require("../../../../../utils/errorMsg");
const searchService = require("../../../../../Service/searchService");
const searchRes = require("./searchRes");

module.exports = {
  handle: async (res, type, keyword) => {
    const searchResult = await searchService.search(res, type, keyword);
    if (!searchResult || searchResult.length === 0) {
      return errorMsg.notFound(res);
    }
    let response = await searchRes.customize(searchResult);
    return response;
  },
};
