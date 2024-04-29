module.exports = {
    /**
     * Insert a recipe to database, throw error if failed
     * @param {object} recipeObj 
     * @returns {
     *   recipeObj: recipeObj
     *   recipeId: recipeId
     * }
     */
    insertRecipe: async (recipeObj, connection) => {
        try {
            const { title, quantity, cookTime, tip, description, imageUrl, userId, tags, steps, ingredients } = recipeObj;

            const insertRecipeSql = 'INSERT INTO \
                `recipes`(`title`, `quantity`, `cooktime`, `tip`, `description`, `imgUrl`, `userId`)\
                VALUES(?,?,?,?,?,?,?)';

            const [result] = await connection.query(
                insertRecipeSql,
                [title, quantity, cookTime, tip, description, imageUrl, userId]
            );
            const recipeId = result.insertId;

            // Insert tags 
            // TODO: New tag handle?
            const selectTagIdsSql = 'SELECT `id` FROM `tags` WHERE `name` IN (?)';
            // Somehow execute() does not working with buck insert, so use query()
            // https://github.com/sidorares/node-mysql2/issues/830
            const [tagResults] = await connection.query(selectTagIdsSql, [tags]);

            const tagsValues = tagResults.map(tag => [recipeId, tag.id]);
            await connection.query(
                'INSERT INTO `recipetags`(`recipeId`, `tagsId`) VALUES ?',
                [tagsValues]
            );

            // Insert steps
            const stepValues = steps.map(step => [step.order, step.imageUrl, step.description, recipeId]);
            await connection.query(
                'INSERT INTO `steps`(`order`, `imgUrl`, `description`, `recipeId`) VALUES ?',
                [stepValues]
            );

            // Insert ingredients
            const ingredientsValues = ingredients.map(ingredients =>
                [ingredients.name, ingredients.size, recipeId]
            );
            await connection.query(
                'INSERT INTO `ingredients`(`name`, `size`, `recipeId`) VALUES ?',
                [ingredientsValues]
            );

            return {
                recipeObj: recipeObj,
                recipeId: recipeId
            }
        } catch (error) {
            throw error;
        }
    }
}