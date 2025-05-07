
const { ConfigureMulterStorage } = require("../../../config/uploadFile");
const successMessages = require("../../../messages/successMessages");
const PreProcessing = require("../../../middleware/Request/PreProcessing");
const PostSuccessProcessing = require("../../../middleware/Response/PostSuccessProcessing");
const EntityNames = require("../../../Types/EntityNames");
const { UploadedFileTypes, UploadValidMimeTypes } = require("../../../Types/UploadFileTypes");
const { getSelf, changeSelf, uploadProfilePicture, getReviews, getUser } = require("../controller/user.controller");


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
router.get("/getReviews/:userId", PreProcessing(entityName), async (req, res) => {
    try {
        const user = await getReviews(req.params.userId)
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


router.put("/changeSelf", PreProcessing(entityName), async(req, res) => {
    try {
        const user = await changeSelf(req.body, req.userId, req.locale)
        const popupMessage = successMessages(req.userId)[req.locale].user.changeSelf
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
})

router.put("/changePic", PreProcessing(entityName), ConfigureMulterStorage(UploadValidMimeTypes.IMAGES, UploadedFileTypes.IMAGE, EntityNames.user, "image"), async(req, res) => {
    try{
        const user = await uploadProfilePicture(req.userId, req.file, EntityNames.user, UploadedFileTypes.IMAGE)
        const popupMessage = successMessages(req.userId)[req.locale].user.changePic 
        const response = PostSuccessProcessing(popupMessage, user)
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

router.get("/getUser/:userId", PreProcessing(entityName), async(req, res) => {
    try{
        const user = await getUser(req.params.userId)
        const popupMessage = successMessages(req.params.userId)[req.locale].user.getSelf
        const response = PostSuccessProcessing(popupMessage, user)
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
}
)
module.exports = router