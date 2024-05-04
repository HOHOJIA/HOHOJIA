const errorMsg = require('../utils/errorMsg');
const connectionPromise = require('../config/db').connectionPromise;
module.exports = {
    selectUserByEmail: async(email)=>{
        const connection = connectionPromise;
        try {
            const [result] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    selectUserById: async(userId)=>{
        const connection = connectionPromise;
        try {
            const [result] = await connection.execute('SELECT * FROM Users WHERE id = ?', [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    insertNewUser: async(userInfoObj, connection)=>{
        try {
            const {name , email, hashedPassword , provider , avatar} = userInfoObj;
            const signupQuery = 'INSERT INTO Users(name, email, password, provider , avatar , isActive) VALUES(?,?,?,?,?,?)';
            const [result] = await connection.execute(signupQuery, [name, email, hashedPassword, provider , avatar , 1]); 
            return result;     
        } catch (error) {
            throw error;
        }
    }
}