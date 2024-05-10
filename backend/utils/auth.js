const jwt = require('jsonwebtoken');
const errorMsg = require('./errorMsg');
require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  });
module.exports = {
    generateAccessToken: async (userId) => {
        const secretKey = process.env.SECRET;
        const payload = { id: userId };
        //console.log(payload);
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        const tokenInfo = {
            token: token,
            expire: `${60 * 60 * 24}`
        };
        return tokenInfo;
    },
    // Middleware for verifying JWT token
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;
        console.log(token);
        try {
            if (!token) {
                return errorMsg.noToken(res);
            }
            const pureToken = token.split(' ')[1];
            const decodedToken = jwt.verify(pureToken, process.env.SECRET);
            req.decodedToken = decodedToken;
            next();
        } catch (error) {
            console.error(error);
            return errorMsg.wrongToken(res);
        }
    },
    
}