const gerAllRecipesHandler = require("../Application/Features/User/Commands/GetAllRecipes/getAllRecipesHandler");

module.exports = {
  getAllRecipes: async (req, res) => {
    try {
      const sort = req.query.sort;
      if (sort === "like") {
        const response = await gerAllRecipesHandler.handle(res, "like");
        res.status(200).json(response);
      } else if (sort === "time") {
        const response = await gerAllRecipesHandler.handle(res, "time");
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
