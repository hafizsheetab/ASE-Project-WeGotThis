
const router=require('express').Router()
const { ConfigureMulterStorageMultiple, ConfigureMulterStorage } = require('../../../config/uploadFile')
const successMessages = require("../../../messages/successMessages")
const PreProcessing = require("../../../middleware/Request/PreProcessing")
const PreProcessingWithoutToken = require("../../../middleware/Request/PreProcessingWithoutToken")
const PostErrorProcessing = require("../../../middleware/Response/PostErrorProcessing")
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing")
const EntityNames = require('../../../Types/EntityNames')
const { UploadValidMimeTypes, UploadedFileTypes } = require('../../../Types/UploadFileTypes')
const { createOffer, editOffer, getOffer, getOffers, updateOffer, deleteOffer, offerTemplate, uploadOfferImages, getMyOffers, addRequests, getMyRequestsToOffers, getRequestsOnMyOffers, acceptOfferRequest, rejectOfferRequest, completeOfferRequest, giveReview, withdrawOfferRequest } = require("../controller/offer.controller")
//todo: add preprocessing later
const entityName = EntityNames.offer;
router.post("/create", PreProcessing(entityName) ,async (req, res) => {
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

router.get("/my/offers", PreProcessing(entityName), async(req, res) => {
    try{
        const offers=await getMyOffers(req.userId);
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


router.get("/template",PreProcessing(entityName),async (req, res) => {
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
router.put("/edit/:offerId", PreProcessing(entityName),async (req, res) => {
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

router.get("/get/:offerId", PreProcessing(entityName), async(req, res) => {
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


router.get("/getAll", PreProcessing(entityName), async(req, res) => {
    try{
        const offers=await getOffers();
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

router.get("/getAll/user/:userId", PreProcessing(entityName), async(req, res) => {
    try{
        const offers=await getOffers(req.params.userId);
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

router.delete("/delete/:offerId",PreProcessing(entityName), async (req, res) => {
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

router.put("/upload/images/:offerId",PreProcessing(entityName), ConfigureMulterStorage(UploadValidMimeTypes.IMAGES, UploadedFileTypes.IMAGE, EntityNames.offer, "image"), async (req, res) => {
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

router.put("/add/requests/:offerId", PreProcessing(entityName), async (req, res) => {
    try{
        const offer = await addRequests(req.body,req.params.offerId, req.userId, req.locale)
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

router.get("/getMyRequestsToOffer", PreProcessing(entityName), async(req, res) => {
    try{
        const requests = await getMyRequestsToOffers(req.userId)
        const popupMessage = successMessages()[req.locale].offer.getOffers
        const response = PostSuccessProcessing(popupMessage, requests)
        res.status(response.statusCode).json(response)
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

router.get("/getRequestsOnMyOffers", PreProcessing(entityName), async(req, res) => {
    try{
        const requests = await getRequestsOnMyOffers(req.userId)
        const popupMessage = successMessages()[req.locale].offer.getOffers
        const response = PostSuccessProcessing(popupMessage, requests)
        res.status(response.statusCode).json(response)
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

router.get("/getAll/requests", PreProcessing(entityName), async(req, res) => {
    try{
        const requests1 = await getRequestsOnMyOffers(req.userId)
        const resquests2 = await getMyRequestsToOffers(req.userId)
        const requests = requests1.concat(resquests2)
        const popupMessage = successMessages()[req.locale].offer.getOffers
        const response = PostSuccessProcessing(popupMessage, requests)
        res.status(response.statusCode).json(response)
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
router.put("/complete/:offerId/:requestId", PreProcessing(entityName), async(req, res) => {
    try{
        const offer = await completeOfferRequest(req.params.offerId, req.userId, req.params.requestId)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
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
router.put("/accept/:offerId/:requestId", PreProcessing(entityName), async(req, res) => {
    try{
        const offer = await acceptOfferRequest(req.params.offerId, req.userId, req.params.requestId)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
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
router.put("/reject/:offerId/:requestId", PreProcessing(entityName), async(req, res) => {
    try{
        const offer = await rejectOfferRequest(req.params.offerId, req.userId, req.params.requestId)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
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

router.put("/giveReview/:offerId/:requestId", PreProcessing(entityName), async(req, res) => {
    try{
        const offer = await giveReview(req.params.offerId, req.userId, req.params.requestId, req.body, req.locale)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
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

router.put("/withdraw/:offerId/:requestId", PreProcessing(entityName), async(req, res) => {
    try{
        const offer = await withdrawOfferRequest(req.params.offerId, req.userId, req.params.requestId)
        const popupMessage = successMessages()[req.locale].offer.editOffer
        const response = PostSuccessProcessing(popupMessage, offer)
        res.status(response.statusCode).json(response)
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


