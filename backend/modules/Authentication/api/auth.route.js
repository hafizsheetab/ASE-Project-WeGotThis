const express = require("express")
const successMessages = require("../../../messages/successMessages")
const PreProcessing = require("../../../middleware/Request/PreProcessing")
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken")
const PostErrorProcessing = require("../../../middleware/Response/PostErrorProcessing")
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing")
const EntityNames = require("../../../Types/EntityNames")
const { loginUser, registerUser,forgotPassword,resetPassword } = require("../controller/auth.controller")

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

router.post("/forgotPassword",PreProcessingWithoutToken, async(req, res) => {
    try {
        const status = await forgotPassword(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].auth.forgotPassword
        const response = PostSuccessProcessing(popupMessage, status)
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

router.post("/resetPassword",PreProcessing(EntityNames.auth), async(req, res) => {
    try {
        const token = await resetPassword(req.body, req.user, req.locale)
        const popupMessage = successMessages()[req.locale].auth.resetPassword
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