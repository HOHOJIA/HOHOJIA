const recipeService = require('../../../../../Service/recipeService');
const postRecipeRes = require('./postRecipeRes');
const errorMsg = require('../../../../../utils/errorMsg');


/**
* Convert post body to recipe object
* @param {*} body 
*/
const recipeObjFromPost = (body) => {
    try {
        return {
            title: body.title,
            quantity: body.quantity,
            cookTime: body.cookTime,
            tip: body.tip,
            description: body.description,
            imageUrl: body.imageUrl,
            userId: body.userId,
            tags: body.tags.map(tag => tag.toString()),
            steps: body.steps.map(step => {
                return {
                    order: step.order,
                    imageUrl: step.imageUrl,
                    description: step.description
                }
            }),
            ingredients: body.ingredients.map(ingredient => {
                return {
                    name: ingredient.name,
                    size: ingredient.size
                }
            })
        };
    } catch (error) {
        console.log('Error in postRecipeHandler.recipeObjFromPost', error);
        return;
    }
};

module.exports = {
    /**
     * @returns {Promise<respone>} or {null} if error
     */
    handle: async (req, res) => {
        const recipeObj = recipeObjFromPost(req.body);
        if (!recipeObj) {
            errorMsg.badRequest(res, 'Invalid post body fromat');
            return;
        }

        const insertResult = await recipeService.postRecipe(res, recipeObj);
        if (!insertResult) return; // Error msg response has already been handled in postRecipe

        recipeObj.recipeId = insertResult.recipeId;
        const respone = postRecipeRes.customize(insertResult, recipeObj);
        return respone;
    }
}