module.exports = {
    customize: (recipeObject) => {
        return {
            data: {
                recipeId: recipeObject.recipeId,
                recipeLink: `/recipe/${recipeObject.recipeId}`
            }
        };
    }
}