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
            // TODO: New tag insert handle?
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
    },

    /**
     * Only query the recipe table. Can be used to check if recipe exists
     */
    selectRecipeById: async (recipeId, connection) => {
        const [recipeResult] = await connection.query(
            "SELECT * FROM `recipes` WHERE `id` = ?",
            [recipeId]
        );
        return recipeResult;
    },

    /**
     * Get a recipe and all related information.
     * Return null if recipe not found
     * 
     * Maybe refactor to fewer query if have time
     * @param {*} recipeId 
     * @param {*} connection 
     * @returns 
     */
    getRecipe: async (recipeId, connection) => {
        try {
            const recipeResult = await module.exports.selectRecipeById(recipeId, connection);
            if (recipeResult.length == 0) return null;
            const recipeObject = recipeResult[0]; // Should thorw error if empty

            const [tagsResult] = await connection.query(
                `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', T.name, 'tagId', RT.tagsId)) AS tags
                FROM tags AS T, recipetags AS RT
                WHERE T.id = RT.tagsId AND RT.recipeId = ?`,
                [recipeId]
            );

            let tags = tagsResult[0].tags;

            const [stepsResult] = await connection.query(
                `SELECT JSON_ARRAYAGG(JSON_OBJECT('order', S.order, 'imageUrl', S.imgUrl, 'description', S.description)) AS steps
                FROM steps AS S
                WHERE S.recipeId = ?;`,
                [recipeId]);

            let steps = stepsResult[0].steps; // Should thorw error if steps is empty

            const [ingredientsResult] = await connection.query(
                `SELECT JSON_ARRAYAGG(JSON_OBJECT('name', I.name, 'size', I.size)) AS ingredients
                FROM ingredients AS I
                WHERE I.recipeId = ?;`,
                [recipeId]
            );

            let ingredients = ingredientsResult[0].ingredients; // Should thorw error if ingredients is empty

            const [commentsResult] = await connection.query(
                `SELECT JSON_ARRAYAGG(JSON_OBJECT(
                    'commentId', C.id, 'userId', C.userId, 'name', U.name, 
                    'replyCommentId', C.replyCommentId, 'content', C.content, 
                    'time', C.time)) AS comments
                FROM recipecomments AS C, users AS U
                WHERE C.userId = U.id AND recipeId = ?;
                `,
                [recipeId]
            );

            let comments = commentsResult[0].comments;

            // TODO: recipeCount?
            const [authorResult] = await connection.query(
                `SELECT U.id AS userId, U.name AS name, U.avatar AS avatarUrl, U.receivedLike AS receivedLike, U.recipeCount AS recipeCount
                FROM users AS U
                WHERE U.id = ?`,
                [recipeObject.userId]
            );

            let author = authorResult[0];

            return {
                recipeId: recipeObject.id,
                title: recipeObject.title,
                description: recipeObject.description,
                imageUrl: recipeObject.imgUrl,
                quantity: recipeObject.quantity,
                cookTime: recipeObject.cooktime,
                totalLike: recipeObject.totalLike,
                tip: recipeObject.tip,
                createdAt: recipeObject.createdAt,
                tags: tags,
                steps: steps,
                ingredients: ingredients,
                comments: comments,
                author: author,
            }

        } catch (error) {
            throw error;
        }
    }
}