const errorMsg = require("../../../../../utils/errorMsg");
const commentService = require("../../../../../Service/commentService");
const commentRes = require("./commentRes");

module.exports = {
  handle: async (res, userId, recipeId, replyCommentId, content, time) => {
    // create obj
    const newCommentObj = {
      userId: userId,
      recipeId: recipeId,
      replyCommentId: replyCommentId,
      content: content,
      time: time,
    };

    const insertResult = await commentService.addComment(res, newCommentObj);
    if (!insertResult) return errorMsg.serverError(res);
    let response = await commentRes.customize(insertResult, newCommentObj);
    return response;
  },
};
