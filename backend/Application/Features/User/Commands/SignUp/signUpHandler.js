const errorMsg = require('../../../../../utils/errorMsg');
const tool = require('../../../../../utils/tool');
const auth = require('../../../../../utils/auth');

const userService = require('../../../../../Service/userService');
const userSignUpRes = require('./signUpRes');
module.exports = {
    handle: async (res, name , email , password) => {
        //init
        let provider = "native";
        let response = null;

        //operation
        const hashedPassword = await tool.generateHashPassword(password);
        const userInfoObj = {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            provider: provider,
            avatar: null
        };

        const insertResult = await userService.signUp(res,userInfoObj);
        if(!insertResult) return errorMsg.emailExist(res);
        const accessTokenInfoObj = await auth.generateAccessToken(insertResult.insertId);
        response = await userSignUpRes.customize(insertResult,userInfoObj,accessTokenInfoObj);
        return response;
    }
}