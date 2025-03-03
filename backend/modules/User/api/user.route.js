const { changeAllFilesToJS } = require("../../../convertSwagger");
const successMessages = require("../../../messages/successMessages");
const PreProcessing = require("../../../middleware/Request/PreProcessing");
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken");
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing");
const EntityNames = require("../../../Types/EntityNames");
const { getOneUser, createUser, loginUser } = require("../controller/user.controller");

const router = require("express").Router();

const entityName = EntityNames.user;
// changeAllFilesToJS("./modules/User/swagger")
router.get("/", PreProcessing(entityName), async (req, res) => {
    try {
        const user = await getOneUser(req.user._id, req.locale)
        const popupMessage = successMessages()[req.locale].user.getOne
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

router.post("/signup", PreProcessingWithoutToken,async(req, res) => {
    try{
        const tokenResponse = await createUser(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].user.create;
        const response = PostSuccessProcessing(popupMessage, tokenResponse);
        res.status(response.statusCode).json(response);
    }
    catch(err){
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
})

router.post("/login",PreProcessingWithoutToken, async(req, res) => {
    try{
        const tokenResponse = await loginUser(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].user.create;
        const response = PostSuccessProcessing(popupMessage, tokenResponse);
        res.status(response.statusCode).json(response);
    }
    catch(err){
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
})

module.exports = router