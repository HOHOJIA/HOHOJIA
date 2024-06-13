const redisClient = require('./cache').redisClient;
const QUOTA =10;
const WINDOW =1;

async function rateLimiter(token) {
    let replies = await redisClient.multi().set(token, 0, { EX: WINDOW, NX: true }).incr(token).exec();

    const reqCount = replies[1];
    if (reqCount > QUOTA) {
        console.log(`Quota of ${QUOTA} per ${WINDOW}sec exceeded for ${token}`);
        return { status: 429, message: `Quota of ${QUOTA} per ${WINDOW}sec exceeded` };
    }
    console.log(`${token} has ${reqCount} requests`);
    return { status: 200, message: 'OK' };
}

const rateLimiterRoute = async (req, res, next) => {
    if (!redisClient.isReady) {
        // Redis is not connected
        return next();
    }
    try {
        const token = req.ip;
        let result = await rateLimiter(token);
        if (result.status == 200) {
            return next();
        } else {
            res.status(result.status).send(result.message);
            return;
        }
    } catch (e) {
        return next();
    }
};

module.exports = { rateLimiterRoute };