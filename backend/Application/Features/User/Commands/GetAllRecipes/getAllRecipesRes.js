module.exports = {
  customize: async (allRecipes) => {
    console.log("resResult: " + allRecipes);
    const response = {
      data: {
        recipes: allRecipes,
      },
    };
    return response;
  },
};
