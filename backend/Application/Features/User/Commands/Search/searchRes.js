module.exports = {
  customize: async (searchResult) => {
    console.log("resResult: " + searchResult);
    const response = {
      data: {
        recipes: searchResult,
      },
    };
    return response;
  },
};
