const errorMsg = require('../utils/errorMsg');
const connectionPromise = require('../config/db').connectionPromise;
module.exports = {
    //此處role_id是提前定義好的 default = 2(user)
    addRoleToUser: async (roleId , userId,connection) => {
        try {
            const addRoleToUserQuery = 'INSERT INTO userRoles(roleId, userId) VALUES(?,?)';
            await connection.execute(addRoleToUserQuery, [roleId,userId]);
        } catch (error) {
            throw error;
        }
    },
    checkRole: async (userId)=>{
        const connection = await connectionPromise;
        try {
            const selectQuery = 'SELECT * FROM userRoles AS u LEFT JOIN roles AS r ON u.roleId = r.id WHERE u.userId = ?'
            const [result] = await connection.execute(selectQuery, [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    }
}