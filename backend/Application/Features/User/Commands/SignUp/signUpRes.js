module.exports = {
    customize: async(insertResult,userInfoObj,accessTokenInfoObj)=>{
        const response = {
            data: {
                access_token: accessTokenInfoObj.token,
                access_expired: accessTokenInfoObj.expire,
                user: {
                    id: insertResult.insertId,
                    provider: userInfoObj.provider,
                    name: userInfoObj.name,
                    email: userInfoObj.email,
                    avatar: userInfoObj.avatar
                }
            }
        };
        return response;
    }
}