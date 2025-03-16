const successMessages = require("../../../messages/successMessages")
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken")
const PostErrorProcessing = require("../../../middleware/Response/PostErrorProcessing")
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing")
const { loginUser, registerUser } = require("../controller/auth.controller")

const router = require("express").Router()

router.post("/login",PreProcessingWithoutToken, async(req, res) => {
    try {
        const token = await loginUser(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].auth.login
        const response = PostSuccessProcessing(popupMessage, token)
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
})

router.post("/register",PreProcessingWithoutToken, async(req, res) => {
    try {
        const token = await registerUser(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].auth.register
        const response = PostSuccessProcessing(popupMessage, token)
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
})

module.exports = router