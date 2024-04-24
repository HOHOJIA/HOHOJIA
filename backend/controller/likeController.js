const likeHandler = require('../Application/Features/User/Commands/Like/likeHandler');
const errorMsg = require('../utils/errorMsg');
const tool = require('../utils/tool');

module.exports = {
    like: async (req, res) => {
        try {
            const { userId, recipeId } = req.body;
            // 未登入或無食譜Id return 401
            if (!userId || !recipeId) return errorMsg.unauthorized(res);
            // 
            const response = await likeHandler.handle(res, userId, recipeId);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },


}