
const router=require('express').Router()
const { ConfigureMulterStorageMultiple, ConfigureMulterStorage } = require('../../../config/uploadFile')
const successMessages = require("../../../messages/successMessages")
const PreProcessing = require("../../../middleware/Request/PreProcessing")("offer")
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken")
const PostErrorProcessing = require("../../../middleware/Response/PostErrorProcessing")
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing")
const EntityNames = require('../../../Types/EntityNames')
const { UploadValidMimeTypes, UploadedFileTypes } = require('../../../Types/UploadFileTypes')
const { createOffer, editOffer, getOffer, getOffers, updateOffer, deleteOffer, offerTemplate, uploadOfferImages } = require("../controller/offer.controller")
//todo: add preprocessing later
router.post("/create",PreProcessing,async (req, res) => {
    try{
        const offer = await createOffer(req.body, req.user.id,req.locale)
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
router.get("/template",PreProcessing,async (req, res) => {
    try{
        const offer = await offerTemplate(req.body, req.user.id,req.locale)
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
router.put("/edit/:offerId", PreProcessing,async (req, res) => {
    try{
        const offer = await editOffer(req.params.offerId,req.body, req.user.id, req.locale)
        const popupMessage = successMessages()[req.locale].offer.editOffer
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

router.get("/get/:offerId", PreProcessing, async(req, res) => {
    try{
        const offer = await getOffer(req.params.offerId, req.user.id, req.locale)
        const popupMessage = successMessages()[req.locale].offer.getOffer
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


router.get("/getAll", PreProcessing, async(req, res) => {
    try{
        const offers=await getOffers(req.locale);
        const popupMessage = successMessages()[req.locale].offer.getOffers
        const response = PostSuccessProcessing(popupMessage, offers)
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

router.delete("/delete/:offerId",PreProcessing, async (req, res) => {
    try{
        const status=await deleteOffer(req.params.offerId, req.user.id, req.locale)
        const popupMessage = successMessages()[req.locale].offer.deleteOffer
        const response = PostSuccessProcessing(popupMessage, status)
        res.status(response.statusCode).json(response)
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

        res.status(statusCode).json(error);
    }
});

router.put("/upload/images/:offerId",PreProcessing, ConfigureMulterStorage(UploadValidMimeTypes.IMAGES, UploadedFileTypes.IMAGE, EntityNames.offer, "image"), async (req, res) => {
    try{
        const files=await uploadOfferImages(req.locale, req.userId, req.params.offerId, req.file, EntityNames.offer, UploadedFileTypes.IMAGE)
        const popupMessage = successMessages()[req.locale].offer.deleteOffer
        const response = PostSuccessProcessing(popupMessage, files)
        res.status(response.statusCode).json(response)
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

        res.status(statusCode).json(error);
    }
});

module.exports = router


