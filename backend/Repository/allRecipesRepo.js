const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  getRecipesSortByLike: async () => {
    const connection = connectionPromise;
    try {
      const sortByLikeQuery = `SELECT recipes.id AS recipeId, recipes.title, recipes.imgUrl,
      JSON_ARRAYAGG(JSON_OBJECT('name', ingredients.name, 'size', ingredients.size)) AS ingredients,
      recipes.userId, users.name AS userName,
      recipes.dailyLike
      FROM hohoja.recipes AS recipes 
      LEFT OUTER JOIN hohoja.users AS users ON recipes.userId = users.id
      LEFT OUTER JOIN hohoja.ingredients AS ingredients ON recipes.id = ingredients.recipeId 
      GROUP BY recipes.id, recipes.title, recipes.userId, users.name
      ORDER BY recipes.dailyLike DESC;`;
      const [result] = await connection.execute(sortByLikeQuery);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getRecipesSortByTime: async () => {
    const connection = connectionPromise;
    try {
      const sortByTimeQuery = `SELECT recipes.id AS recipeId, recipes.title, recipes.imgUrl,
      JSON_ARRAYAGG(JSON_OBJECT('name', ingredients.name, 'size', ingredients.size)) AS ingredients,
      recipes.userId, users.name AS userName,
      recipes.createdAt
      FROM hohoja.recipes AS recipes 
      LEFT OUTER JOIN hohoja.users AS users ON recipes.userId = users.id
      LEFT OUTER JOIN hohoja.ingredients AS ingredients ON recipes.id = ingredients.recipeId 
      GROUP BY recipes.id, recipes.title, recipes.userId, users.name
      ORDER BY recipes.createdAt DESC;`;
      const [result] = await connection.execute(sortByTimeQuery);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
