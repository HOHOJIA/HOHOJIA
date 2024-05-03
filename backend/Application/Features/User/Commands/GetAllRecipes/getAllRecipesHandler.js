const errorMsg = require("../../../../../utils/errorMsg");
const allRecipesService = require("../../../../../Service/allRecipesService");
const getAllRecipesRes = require("./getAllRecipesRes");

module.exports = {
  handle: async (res, type) => {
    const allRecipes = await allRecipesService.getAllRecipes(res, type);
    if (!allRecipes || allRecipes.length === 0) {
      return errorMsg.notFound(res);
    }
    let response = await getAllRecipesRes.customize(allRecipes);
    return response;
  },
};
