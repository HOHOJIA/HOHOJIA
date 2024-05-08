const connectionPromise = require('../config/db').connectionPromise;
module.exports = {
    selectUserByEmail: async(email)=>{
        const connection = connectionPromise;
        try {
            const signInQuery = "SELECT * FROM users WHERE email = ?";
            
            const [result] = await connection.execute(signInQuery, [email]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    selectUserById: async(userId)=>{
        const connection = connectionPromise;
        try {
            const [result] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
            return result;
        } catch (error) {
            throw error;
        }
    },
    insertNewUser: async(userInfoObj, connection)=>{
        try {
            const {name , email, hashedPassword , provider , avatar} = userInfoObj;
            console.log(userInfoObj)
            const signupQuery = 'INSERT INTO users(name, email, password, provider , avatar , isActive) VALUES(?,?,?,?,?,?)';
            const [result] = await connection.execute(signupQuery, [name, email, hashedPassword, provider , avatar , 1]); 
            return result;     
        } catch (error) {
            throw error;
        }
    }
}