const userRepo = require('../Repository/userRepo');
const roleRepo = require('../Repository/roleRepo');
const errorMsg = require('../utils/errorMsg');
const connectionPromise = require('../config/db').connectionPromise;

module.exports = {
    signUp: async (res, userIfoObj) => {
        const connection = await connectionPromise.getConnection();
        try {
            //transaction 
            const checkResult = await userRepo.selectUserByEmail(userIfoObj.email);
            if (checkResult.length > 0) {
                return null;
            }

            await connection.beginTransaction();
            const insertResult = await userRepo.insertNewUser(userIfoObj, connection);
            await roleRepo.addRoleToUser(2 , insertResult.insertId , connection);
            await connection.commit();

            return insertResult;

        } catch (error) {
            await connection.rollback();
            console.error(error);
            errorMsg.query(res);
        } finally {
            console.log('connection release');
            connection.release();
        }

    },
}