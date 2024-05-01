module.exports = {
    customize: (recipeObject) => {
        const response = {
            recipeId: recipeObject.recipeId,
            recipeLink: `/details/${recipeObject.recipeId}`
        };
        return response;
    }
}