const errorMsg = require("../../../../../utils/errorMsg");
const searchService = require("../../../../../Service/searchService");
const searchRes = require("./searchRes");

module.exports = {
  handleForTitle: async (res, title) => {
    const searchResult = await searchService.searchByTitle(res, title);
    if (!searchResult || searchResult.length === 0) {
      return errorMsg.notFound(res, "No recipes found for the given title");
    }
    let response = await searchRes.customize(searchResult);
    return response;
  },
};
