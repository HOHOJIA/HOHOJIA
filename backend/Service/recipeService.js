const recipeRepo = require('../Repository/recipeRepo');
const errorMsg = require('../utils/errorMsg');
const connectionPromise = require('../config/db').connectionPromise;


// Recipe service: business logic for recipe related operations
module.exports = {
    /**
     * Post a recipe
     * @param {object} res: response object 
     * @param {object} recipeObj 
     * @returns {recipeObj, recipeId} if success, {null} if failed
     */
    postRecipe: async (res, recipeObj) => {
        const connection = await connectionPromise.getConnection();
        try {
            await connection.beginTransaction();
            const insertResult = await recipeRepo.insertRecipe(recipeObj, connection);
            await connection.commit();

            return insertResult;
        } catch (error) {
            await connection.rollback();
            console.log('Error in recipeService', error);
            errorMsg.query(res);
        } finally {
            connection.release();
        }
    },
}