module.exports = {
    customize: (recipeObject) => {
        return {
            data: {
                recipeId: recipeObject.recipeId,
                recipeLink: `/details/${recipeObject.recipeId}`
            }
        };
    }
}