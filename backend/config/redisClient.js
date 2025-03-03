const redis = require("redis");

const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
    connectTimeout: 10000,
    database: process.env.REDIS_DATABASE
});
// const redisClient = {}
const service = "redis";
async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log("Connection established to redis!");
        return;
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
        throw {
            errorCode: "general.system",
            service
        }
    }
}


module.exports = { redisClient, connectToRedis };