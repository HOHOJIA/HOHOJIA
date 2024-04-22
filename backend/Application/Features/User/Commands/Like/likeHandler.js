const errorMsg = require('../../../../../utils/errorMsg');
const likeService = require('../../../../../Service/likeService');
const liekRes = require('./likeRes');

module.exports = {
    handle: async (res, userId, recipeId) => {
        // create obj 
        const likeObj = {
            userId: userId,
            recipeId: recipeId
        };

        const insertResult = await likeService.like(res, likeObj);
        if (!insertResult) return errorMsg.serverError(res);
        let response = await liekRes.customize();
        return response;
    }
}