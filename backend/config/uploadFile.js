require("dotenv").config();
const multer = require("multer");
const EntityNames = require("../Types/EntityNames");
const PostErrorProcessing = require("../middleware/Response/PostErrorProcessing");

const FILE_SIZE_LIMIT = parseInt(process.env.FILE_SIZE_LIMIT);


const service = "configureStorage"


function upload(expectedMimeTypes, fileType, userId, serviceName) {
    // console.log("in upload function of config storage")
    const fileFilter = (req, file, cb) => {
        if (expectedMimeTypes.some(mimeType => file.mimetype === mimeType)) {
            cb(null, true);
        } else {
            const error = {
                apiErrorCode: "file.invalidFormat",
                entityName: EntityNames.file,
                service,
            };
            cb(error, false);
        }
        //  console.log("out of upload function of config storage")

    };

    return multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: parseInt(FILE_SIZE_LIMIT) },
        fileFilter: fileFilter,
    });
}

const ConfigureMulterStorage = (expectedMimeTypes, fileType, serviceName, fieldName) => {
    return async (req, res, next) => {
        const statusCode = 400;
        const userId = req.userId ? req.userId : req.params.userId
        serviceName = serviceName ? serviceName : req.params.serviceName
        const uploadMiddleware = upload(expectedMimeTypes, fileType, String(userId), serviceName).single(fieldName);
        uploadMiddleware(req, res, (err) => {
            console.log(err)
            if(err && err.code === 'LIMIT_FILE_SIZE'){
                err.apiErrorCode = "general.maxFileSize"
            }

            if (err) {
                const error = PostErrorProcessing(
                    statusCode,
                    [],
                    EntityNames.file,
                    service,
                    err.apiErrorCode,
                    req.locale,
                );
                console.log(error);
                return res.status(statusCode).json(error);

            }

            next();
        });

    };
};
const ConfigureMulterStorageMultiple = (expectedMimeTypes, fileType, serviceName, fieldName, numberOfDocument) => {
    return async (req, res, next) => {
        const statusCode = 400;
        const userId = req.userId ? req.userId : req.params.userId
        serviceName = serviceName ? serviceName : req.params.serviceName
        console.log(fileType, String(userId), serviceName)
        const uploadMiddleware = upload(expectedMimeTypes, fileType, String(userId), serviceName).array(fieldName, numberOfDocument)
        uploadMiddleware(req, res, (err) => {
            if (err) {
                const error = PostErrorProcessing(
                    statusCode,
                    [],
                    EntityNames.file,
                    service,
                    err.apiErrorCode,
                    req.locale,
                );
                console.log(err);
                return res.status(statusCode).json(error);

            }

            next();
        });

    };
};
module.exports = { ConfigureMulterStorage, ConfigureMulterStorageMultiple }