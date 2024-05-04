const errorMsg = require("../../../../../utils/errorMsg");
const likeService = require("../../../../../Service/likeService");
const liekRes = require("./likeRes");

function formatWithZero(num) {
  return num < 10 ? "0" + num : num;
}

module.exports = {
  handle: async (res, userId, recipeId) => {
    // createdAt format
    const currentTime = new Date();
    const offset = -currentTime.getTimezoneOffset(); // local時區偏移量
    const taiwanOffset = -480; // 台灣 UTC+8 == -480分鐘
    const taiwanTime = new Date(
      currentTime.getTime() + (offset + taiwanOffset) * 60 * 1000
    );

    const createdAt = `${taiwanTime.getFullYear()}-${formatWithZero(
      taiwanTime.getMonth() + 1
    )}-${formatWithZero(taiwanTime.getDate())}T${formatWithZero(
      taiwanTime.getHours()
    )}:${formatWithZero(taiwanTime.getMinutes())}:${formatWithZero(
      taiwanTime.getSeconds()
    )}Z`;

    // create obj
    const likeObj = {
      userId: userId,
      recipeId: recipeId,
      createdAt: createdAt,
    };

    const insertResult = await likeService.like(res, likeObj);
    if (!insertResult) return errorMsg.serverError(res);
    let response = await liekRes.customize();
    return response;
  },
};
