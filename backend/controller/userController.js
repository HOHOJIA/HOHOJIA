const userSignUpHandler = require('../Application/Features/User/Commands/SignUp/signUpHandler');
const userSignInHandler = require('../Application/Features/User/Commands/SignIn/signInHandler');
const errorMsg = require('../utils/errorMsg');
const tool = require('../utils/tool');

module.exports = {
    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) return errorMsg.inputEmpty(res);
            if (!await tool.checkEmail(email)) {
                return errorMsg.emailFormat(res);
            }
            const response = await userSignUpHandler.handle(res, name, email, password);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    },
    signIn: async(req,res)=>{
        try {
            const { provider , email , password } = req.body;
            if (!email || !password) return errorMsg.inputEmpty(res);
            console.log(email);
            const response=await userSignInHandler.handle(res, provider , email , password);
            res.status(200).json(response);
        } catch (error) {
            console.log(error)
        }
    }


}