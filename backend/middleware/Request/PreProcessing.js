const jwt = require("jsonwebtoken");
const EntityNames = require("../../Types/EntityNames");
const checkPermission = require("../../utils/checkPermission");
const PostErrorProcessing = require("../Response/PostErrorProcessing");
const User = require("../../Schema/User");
const verifyJwt = (token) => {
    return new Promise((resovle, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                resovle(false);
            } else {
                resovle(decoded.userId);
            }
        });
    });
};

module.exports = (entityName) => {
    return async (req, res, next) => {
        const token = req.headers["x-auth-token"];
        const locale = req.headers["x-locale"];
        const service = "preProcessing";
        try {
            if (!token || !locale) {
                throw {
                    apiErrorCode: "general.missingHeader",
                    entityName: EntityNames.header,
                    service,
                };
            }
            if(!(locale === "en" || locale === "de")){
                throw {
                    apiErrorCode: "general.invalidLocale",
                    entityName: EntityNames.header,
                    service,
                }
            }
            const userId = await verifyJwt(token);
            if (!userId) {
                throw {
                    apiErrorCode: "general.invalidToken",
                    entityName: EntityNames.header,
                    service,
                };
            }
            const user = await User.get(userId)
            if (!user) {
                throw {
                    apiErrorCode: "general.invalidUser",
                    entityName: EntityNames.header,
                    service,
                };
            }
            req.locale = locale;
            req.userId = user.id;
            req.deviceId = deviceId;
            req.user = user
            next();
        } catch (err) {
            const statusCode = 401;
            const error = PostErrorProcessing(
                statusCode,
                [],
                EntityNames.header,
                service,
                err.apiErrorCode,
                locale,
                entityId
            );
            res.status(statusCode).json(error);
        }
    };
};
