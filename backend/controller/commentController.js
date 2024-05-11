const commentHandler = require("../Application/Features/User/Commands/Comment/commentHandler");
const errorMsg = require("../utils/errorMsg");
const tool = require("../utils/tool");

module.exports = {
  addComment: async (req, res) => {
    try {
      const userId = req.decodedToken.id;
      const recipeId = req.body.recipeId;
      const replyCommentId = req.body.replyCommentId;
      const content = req.body.content;
      // 未登入或無食譜Id return 401
      console.log("in comment controller : " + userId);
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
