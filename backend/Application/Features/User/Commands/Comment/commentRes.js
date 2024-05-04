module.exports = {
  customize: async (insertResult, newCommentObj) => {
    const response = {
      data: {
        comment: {
          commentId: insertResult.insertId,
          userId: parseInt(newCommentObj.userId),
          recipeId: parseInt(newCommentObj.recipeId),
          replyCommentId: parseInt(newCommentObj.replyCommentId),
          content: newCommentObj.content,
          time: newCommentObj.time,
        },
      },
    };
    return response;
  },
};
