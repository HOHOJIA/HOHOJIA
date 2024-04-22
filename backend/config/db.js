const mysql = require('mysql2/promise'); 
const dotenv = require('dotenv');
dotenv.config()

const connectionPromise =  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

module.exports = {
    connectionPromise
};
