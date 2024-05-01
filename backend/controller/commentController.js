const commentHandler = require("../Application/Features/User/Commands/Comment/commentHandler");
const errorMsg = require("../utils/errorMsg");
const tool = require("../utils/tool");

module.exports = {
  addComment: async (req, res) => {
    try {
      const { userId, recipeId, replyCommentId, content } = req.body;
      // 未登入或無食譜Id return 401
      if (!userId || !recipeId) return errorMsg.unauthorized(res);
      // create time
      let time = tool.formatTime();
      //
      const response = await commentHandler.handle(
        res,
        userId,
        recipeId,
        replyCommentId == "" ? null : replyCommentId,
        content,
        time
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async (req, res) => {
    // TODO
  },
};
