const formatTime = require('../../../../../utils/tool').converTimeFormat;
module.exports = {
    customize: (recipeObject) => {

        if (recipeObject.comments) {
            recipeObject.comments.forEach((comment) => {
                comment.time = formatTime(comment.time);
            });
        } else {
            recipeObject.comments = [];
        }

        if (!recipeObject.tags) {
            recipeObject.tags = [];
        }

        const response = {
            data: {
                recipeId: Number(recipeObject.recipeId),
                title: recipeObject.title,
                description: recipeObject.description,
                imageUrl: recipeObject.imageUrl,
                quantity: Number(recipeObject.quantity),
                cookTime: Number(recipeObject.cookTime),
                totalLike: Number(recipeObject.totalLike), // TODO: Database handle
                tip: recipeObject.tip,
                createdAt: formatTime(recipeObject.createdAt),
                tags: recipeObject.tags,
                steps: recipeObject.steps,
                ingredients: recipeObject.ingredients,
                comments: recipeObject.comments,
                author: recipeObject.author,
            },
        };
        return response;
    }
}