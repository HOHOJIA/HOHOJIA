const errorMsg = require('../../../../../utils/errorMsg');
const tool = require('../../../../../utils/tool');
const auth = require('../../../../../utils/auth');

const userService = require('../../../../../Service/userService');
const userSignInRes = require('./signInRes');
module.exports = {
    handle: async (res, provider, email, password) => {
        //init
        let response = null;

        //operation
        const getUserdata = await userService.signIn(email);
        if (getUserdata.length === 0) return errorMsg.noUser(res);
            
        console.log(getUserdata);
        if (! await tool.confirmPassword(password, getUserdata[0].password)) return errorMsg.wrongPassword(res);
        const accessTokenInfoObj = await auth.generateAccessToken(getUserdata[0].id);
        response = await userSignInRes.customize(getUserdata, accessTokenInfoObj)
        return response;
    }
}