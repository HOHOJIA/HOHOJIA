const recipeService = require('../../../../../Service/recipeService');
const postRecipeRes = require('./postRecipeRes');

module.exports = {
    /**
     * @returns {Promise<respone>} or {null} if error
     */
    handle: async (req, res) => {
        const recipeObj = req.body; // TODO: check

        const insertResult = await recipeService.postRecipe(res, recipeObj);
        if (!insertResult) return; // Error msg response has already been handled in postRecipe

        recipeObj.recipeId = insertResult.recipeId;
        const respone = postRecipeRes.customize(insertResult, recipeObj);
        return respone;
    }
}