module.exports = {
  customize: async (returnCommentObj) => {
    console.log("-----" + returnCommentObj);
    const response = {
      data: {
        comment: {
          commentId: returnCommentObj.commentId,
          userId: parseInt(returnCommentObj.userId),
          username: returnCommentObj.username,
          recipeId: parseInt(returnCommentObj.recipeId),
          replyCommentId: parseInt(returnCommentObj.replyCommentId),
          content: returnCommentObj.content,
          time: returnCommentObj.time,
        },
      },
    };
    return response;
  },
};
