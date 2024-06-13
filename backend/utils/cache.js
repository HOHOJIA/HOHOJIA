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
      console.log(`Retrying in ${Math.min(retries * 50, 500)} ms`);
      return Math.min(retries * 50, 500);
    },
    connectTimeout: timeout,
  },
});

redisClient.on('ready', () => {
    console.log('Redis is ready');
});

redisClient.on('error', () => {
    if (process.env.NODE_ENV == 'production') {
        console.log('Error in Redis');
    }
});

redisClient.on('end', () => {
    console.log('Redis is disconnected');
});
async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    throw err;  // Optional: throw error to handle it in the caller
  }
}

// Middleware to check the cache before fetching data
const cacheTitle = async (req, res, next) => {
  const { title, tag } = req.query;
  if (title) {
    try {
      const data = await redisClient.get(title);
      if (data) {
        let response = {
          data: {
            recipes: JSON.parse(data),
          },
        };
        console.error("Get from Redis: ", data);
        return res.send(response);
      }
      next();
    } catch (err) {
      console.error("Redis get error:", err);
      return res.status(500).send(err);
    }
  } else if (tag) {
    try {
      const data = await redisClient.get(tag);
      if (data) {
        let response = {
          data: {
            recipes: JSON.parse(data),
          },
        };
        console.error("Get from Redis: ", data);
        return res.send(response);
      }
      next();
    } catch (err) {
      console.error("Redis get error:", err);
      return res.status(500).send(err);
    }
  }
};
module.exports = {
  redisClient,
  cacheTitle,
  connectRedis
};
