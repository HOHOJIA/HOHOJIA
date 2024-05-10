const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
// const path = require("path");
dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

console.log(process.env.DB_HOST)
console.log(process.env.NODE_ENV)
console.log(process.env.DB_USER)
const connectionPromise = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});
console.log(process.env.DB_HOST)
module.exports = {
    connectionPromise,
};
