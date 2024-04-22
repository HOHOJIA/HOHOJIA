const errorMsg = require('../utils/errorMsg');
const connectionPromise = require('../config/db').connectionPromise;
module.exports = {
    addLike: async (likeObj) => {
        const connection = connectionPromise;
        try {
            const { userId, recipeId } = likeObj;
            const likeQuery = 'INSERT INTO Like(userId,recipeId) VALUES(?,?)';
            const [result] = await connection.execute(likeQuery, [userId, recipeId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}