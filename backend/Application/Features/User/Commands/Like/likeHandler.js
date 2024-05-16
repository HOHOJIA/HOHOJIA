const errorMsg = require("../../../../../utils/errorMsg");
const likeService = require("../../../../../Service/likeService");
const likeRes = require("./likeRes");
const verifyToken = require("../../../../../utils/auth");

function formatWithZero(num) {
  return num < 10 ? "0" + num : num;
}

module.exports = {
  handle: async (res, userId, recipeId) => {
    // create obj
    const likeObj = {
      userId: userId,
      recipeId: recipeId,
    };

    const insertResult = await likeService.like(res, likeObj);
    // check if liked
    if (!insertResult) return errorMsg.likeExist(res);
    let response = await likeRes.customize();
    return response;
  },
};
