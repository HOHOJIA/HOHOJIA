const redis = require("redis");
const timeout = 10000;
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        return new Error("Retry limit exceeded");
      }
      return Math.min(retries * 50, 500);
    },
    connectTimeout: timeout,
  },
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Error connecting to Redis", err);
  }
})();

// Middleware to check the cache before fetching data
const cacheTitle = async (req, res, next) => {
  const { title } = req.query;
  try {
    const data = await redisClient.get(title);
    if (data) {
      return res.send(JSON.parse(data));
    }
    next();
  } catch (err) {
    console.error("Redis get error:", err);
    return res.status(500).send(err);
  }
};
module.exports = {
  redisClient,
  cacheTitle,
};
