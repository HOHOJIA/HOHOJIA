const errorMsg = require("../../../../../utils/errorMsg");
const commentService = require("../../../../../Service/commentService");
const commentRes = require("./commentRes");

module.exports = {
  handle: async (res, userId, recipeId, replyCommentId, content, time) => {
    // create obj
    console.log("in comment handler : " + userId);
    const newCommentObj = {
      userId: userId,
      recipeId: recipeId,
      replyCommentId: replyCommentId,
      content: content,
      time: time,
    };
    const insertResult = await commentService.addComment(res, newCommentObj);
    if (!insertResult) return errorMsg.serverError(res);
    // 取出留言
    const returnCommentObj = await commentService.checkComment(
      insertResult.insertId
    );
    // DB取出的時間是UTC-8 我要加回去變成UTC
    let dbTime = new Date(returnCommentObj[0].time);
    dbTime.setHours(dbTime.getHours() + 8); // 加8小
    returnCommentObj[0].time = dbTime.toISOString();
    let response = await commentRes.customize(returnCommentObj[0]);
    return response;
  },
};
