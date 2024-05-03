const allRecipesRepo = require("../Repository/allRecipesRepo");
const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;

module.exports = {
  getAllRecipes: async (res, type) => {
    const connection = await connectionPromise.getConnection();
    try {
      //transaction
      let allRecipes;
      await connection.beginTransaction();
      if (type === "like") {
        allRecipes = await allRecipesRepo.getRecipesSortByLike();
      } else if (type === "time") {
        allRecipes = await allRecipesRepo.getRecipesSortByTime();
      }
      await connection.commit();

      return allRecipes;
    } catch (error) {
      await connection.rollback();
      console.error(error);
      errorMsg.query(res);
    } finally {
      console.log("connection release");
      connection.release();
    }
  },
};
