const errorMsg = require("../../../../../utils/errorMsg");
const likeService = require("../../../../../Service/likeService");
const likeRes = require("./likeRes");

module.exports = {
  handle: async (res, userId, recipeId) => {
    // create obj
    const likeObj = {
      userId: userId,
      recipeId: recipeId,
    };

    const deleteResult = await likeService.unlike(res, likeObj);
    // check if liked
    if (!deleteResult) return errorMsg.likeNotExist(res);
    let response = await likeRes.customize();
    return response;
  },
};
