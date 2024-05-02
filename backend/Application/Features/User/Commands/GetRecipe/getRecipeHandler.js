const recipeService = require('../../../../../Service/recipeService');
const getRecipeRes = require('./getRecipeRes');

module.exports = {
    /**
     * @returns {Promise<respone>} or {null} if error
     */
    handle: async (req, res) => {
        const recipeObj = await recipeService.getRecipe(res, req.params.recipeId);
        if (!recipeObj) return;

        const respone = getRecipeRes.customize(recipeObj);
        return respone;
    }
}