const errorMsg = require("../utils/errorMsg");
const connectionPromise = require("../config/db").connectionPromise;
module.exports = {
  searchByTitle: async (title) => {
    const connection = connectionPromise;
    try {
      const titleQuery = `SELECT recipes.id AS recipeId, recipes.title, recipes.imgUrl,
            JSON_ARRAYAGG(JSON_OBJECT('name', ingredients.name, 'size', ingredients.size)) AS ingredients,
            recipes.userId, users.name AS userName
     FROM hohoja.recipes AS recipes 
     LEFT OUTER JOIN hohoja.users AS users ON recipes.userId = users.id
     LEFT OUTER JOIN hohoja.ingredients AS ingredients ON recipes.id = ingredients.recipeId
     WHERE recipes.title = ?
     GROUP BY recipes.id, recipes.title, users.id, users.name;`;
      const [result] = await connection.execute(titleQuery, [title]);
      console.log(title);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
