const EntityNames = require("../../Types/EntityNames");
const PostErrorProcessing = require("../Response/PostErrorProcessing");

module.exports = async (req, res, next) => {
    const locale = req.headers["x-locale"];
    try {
        if (!locale) {
            throw {
                apiErrorCode: "general.missingHeader",
                entityName: EntityNames.header,
                service,
            };
        }
        if(!(locale === "en") || (locale === "de")){
            throw {
                apiErrorCode: "general.invalidLocale",
                entityName: EntityNames.header,
                service
            }
        }
        req.locale = locale;
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
