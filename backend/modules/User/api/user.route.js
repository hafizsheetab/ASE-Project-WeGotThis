
const successMessages = require("../../../messages/successMessages");
const PreProcessing = require("../../../middleware/Request/PreProcessing");
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing");
const EntityNames = require("../../../Types/EntityNames");
const { getSelf } = require("../controller/user.controller");


const router = require("express").Router();

const entityName = EntityNames.user;
router.get("/getSelf", PreProcessing(entityName), async (req, res) => {
    try {
        const user = await getSelf(req.user)
        const popupMessage = successMessages(req.userId)[req.locale].user.getSelf
        const response = PostSuccessProcessing(popupMessage, user)
        res.status(response.statusCode).json(response)
    } catch (err) {
        console.log(err);
        const statusCode = 401;
        const error = PostErrorProcessing(
            statusCode,
            err.formErrors,
            err.entityName,
            err.service,
            err.apiErrorCode,
            req.locale
        );
        res.status(statusCode).json(error);
    }
});


module.exports = router