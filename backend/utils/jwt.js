
const jwt = require("jsonwebtoken");
const createToken = (identifier, expire=true) => {
    let token
    token = jwt.sign({ identifier }, process.env.ACCESS_TOKEN_SECRET);
    return {
        access_token: token,
        token_type: "jsonwebtoken",
        expires_in: expire ? parseInt(process.env.ACCESS_TOKEN_DEFAULT_EXPIRATION) : 0,
        identifier,
    };
};

const decodeTokenAndReturnIdentifier = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                resolve(false);
            } else {
                resolve(decoded.identifier);
            }
        });
    });
}

module.exports = {createToken, decodeTokenAndReturnIdentifier}