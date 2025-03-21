const router=require('express').Router();
const successMessages = require("../../../messages/successMessages")
const PreProcessing = require("../../../middleware/Request/PreProcessing")
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken")
const PostErrorProcessing = require("../../../middleware/Response/PostErrorProcessing")
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing")
const { createOffer, editOffer, getOffer, getOffers, updateOffer, deleteOffer } = require("../controller/offer.controller")
router.post("/offerCreate", PreProcessing async (req, res) => {
    try{
        const offer = await createOffer(req.body, req.locale)
        const popupMessage = successMessages()[req.locale].offer.createOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
    }catch(err){
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

router.put("/offerEdit/:offerId", PreProcessing,async (req, res) => {
    try{
        const offer = await editOffer(req.params.offerId,req.body, req.userId, req.locale)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
    }catch(err){
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

router.get("/offerGet/:offerId", PreProcessing, (req, res) => {
    try{
        const offer = await getOffer(req.params.offerId, req.userId, req.locale)
        const popupMessage = successMessages()[req.locale].offer.getOffer
        const response = PostSuccessProcessing(popupMessage, offer)
    }catch(err){
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


router.get("/offers", PreProcessing, (req, res) => {
    try{
        const offers=await getOffers(req.locale);
        const popupMessage = successMessages()[req.locale].offer.getOffers
        const response = PostSuccessProcessing(popupMessage, offers)
    }catch(err){
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

router.delete("/offerDelete/:offerId",PreProcessing, async (req, res) => {
    try{
        const status=await deleteOffer(req.params.offerId, req.userId, req.locale)
        const popupMessage = successMessages()[req.locale].offer.deleteOffer
        const response = PostSuccessProcessing(popupMessage, status)
    }catch (err){
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
    }
});
