
const jwt = require("jsonwebtoken");
const createToken = (identifier, type="access",expire=true) => {

    let expiresIn;

    switch(type){
        case "access":
            expiresIn=expire ? parseInt(process.env.ACCESS_TOKEN_DEFAULT_EXPIRATION) : 0;
            break;
        case "reset":
            expiresIn = expire ? parseInt(process.env.RESET_PASSWORD_EXPIRATION) || 300 : 0; // default 5 minutes
            break;
        default:
            throw new Error("Invalid token type");
    }
    let token;
    token = jwt.sign({ identifier,type }, process.env.ACCESS_TOKEN_SECRET);
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
            } 
            else {
                resolve(decoded.identifier);
            }
        });
    });
}

module.exports = {createToken, decodeTokenAndReturnIdentifier}