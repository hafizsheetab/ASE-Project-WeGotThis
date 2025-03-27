const { redisClient } = require("../../config/redisClient");
const crypto = require("crypto");
// const generateID = require("../generateID");
const generateID = () => {
    return crypto.randomBytes(48).toString("base64");
};
const SESSION_TTL = process.env.ACCESS_TOKEN_DEFAULT_EXPIRATION;
const OTP_TTL = process.env.OTP_DEFAULT_EXPIRATION

const service = "redis";
const LAST_ACCESSED_FIELD = "lastAccessed";

/*
The schema of any session will be following
{
    session_id: String,
    identifier: String,
    servicePermission: String,
    lastAccesed: Date.now()
}
*/
const storeSessionInRedis = async (data) => {
    try {
        let ttl = SESSION_TTL
        if(data.reset){
            ttl = process.env.ACCESS_TOKEN_DEFAULT_EXPIRATION_RESET
        }
        const uuid = generateID();
        const sessionKey = _getSessionKey(data.identifier);
        data["session_id"] = uuid;
        data[LAST_ACCESSED_FIELD] = Date.now();
        await redisClient.hSet(sessionKey, {identifier: data.identifier, session_id: data.session_id});
        if(data.expire){
            await redisClient.expire(sessionKey, ttl);
        }
        return { active: true, session_id: uuid };
    } catch (err) {
        console.log(err);
        const error = {
            apiErrorCode: "general.redisSessionCreationError",
            service,
        };
        throw error;
    }
};

const updateFieldInRedis = async (identifier, fieldName, value) => {
    try {
        const sessionKey = _getSessionKey(identifier);
        await redisClient.hSet(sessionKey, LAST_ACCESSED_FIELD, Date.now());
        await redisClient.hSet(sessionKey, fieldName, value);
    } catch (err) {
        console.log(err);
        const error = {
            apiErrorCode: "general.redisSessionCreationError",
            service,
        };
        throw error;
    }
};
async function getAndRefreshSessionFromRedis(data) {
    try {
        const sessionKey = _getSessionKey(data.identifier);
        const entryExists = await redisClient.exists(sessionKey);
        if (!entryExists) {
            throw {
                apiErrorCode: "general.invalidToken",
                service,
                statusCode: 440
            };
        }
        if(data.expire){
            await redisClient.expire(sessionKey, SESSION_TTL);
        }
        else {
            await redisClient.expire(sessionKey, 0)
        }
        await redisClient.hSet(sessionKey, LAST_ACCESSED_FIELD, Date.now());
        const sessionData = await redisClient.hGetAll(sessionKey);
        if (!sessionData) {
            throw {
                apiErrorCode: "general.invalidToken",
                service,
                statusCode: 440
            };
        }
        return sessionData;
    } catch (err) {
        console.log(err);
        const error = {
            apiErrorCode: "general.invalidToken",
            service,
            statusCode: 440
        };
        throw error;
    }
}
const _getSessionKey = (identifier) => {
    return `session-middleware-${identifier}`;
};
const setJson = async (key, payload) => {
    await redisClient.set(key, JSON.stringify(payload))
}
const setOtp = async (key, value) => {
    console.log(key, value)
    await redisClient.set(key, value)
    await redisClient.expire(key, OTP_TTL)
}
const getOtp = async (key) => {
    return await redisClient.get(key)
}
const deleteOtp = async(key) => {
    return await redisClient.del(key)
}
const getJson = async (key) => {
    const value = await redisClient.get(key)
    return JSON.parse(value)
}
const deleteSession =  async(identifier) => {
    const sessionKey = _getSessionKey(identifier);
    await redisClient.del(sessionKey)
}
const deleteKey = async (key) => {
    try {
        const result = await redisClient.del(key);
        if (result === 1) {
            console.log(`✅ Deleted Redis key: ${key}`);
        } else {
            console.log(`⚠️ Redis key not found: ${key}`);
        }
    } catch (err) {
        console.error(`❌ Redis delete error: ${err}`);
    }
};

module.exports = {
    storeSessionInRedis,
    getAndRefreshSessionFromRedis,
    updateFieldInRedis,
    setJson,
    getJson,
    deleteSession,
    setOtp,
    getOtp,
    deleteOtp,
    deleteKey
};