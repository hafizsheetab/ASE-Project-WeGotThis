
const EntityNames = require("../../Types/EntityNames");
const PostErrorProcessing = require("../Response/PostErrorProcessing");
const User = require("../../Schema/User");
const { decodeTokenAndReturnIdentifier } = require("../../utils/jwt");
const { getAndRefreshSessionFromRedis } = require("../../utils/redis");

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
            const userId = await decodeTokenAndReturnIdentifier(token)
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
            await getAndRefreshSessionFromRedis({expire: user.expire, identifier: userId})
            req.locale = locale;
            req.userId = user.id;
            req.user = user
            next();
        } catch (err) {
            console.log(err)
            const statusCode = 401;
            const error = PostErrorProcessing(
                statusCode,
                [],
                EntityNames.header,
                service,
                err.apiErrorCode,
                locale,
            );
            res.status(statusCode).json(error);
        }
    };
};
