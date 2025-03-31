const Offer = require("../../../Schema/Offer");
const { v4: uuidv4 } = require("uuid");

const Forms = require("../../../Types/Forms");
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters");
const formErrorMessages = require("../../../messages/formErrorMessages");
const EntityNames = require("../../../Types/EntityNames");
const {
    storeSessionInRedis,
    setJson,
    getJson,
    deleteKey,
} = require("../../../utils/redis");
const {
    formDataSchemaValidationErrorHandler,
    getS3Key,
} = require("../../../utils");
const {
    OfferValidationSchema,
    EditOfferValidationSchema,
    OfferGetValidationSchema,
} = require("../validation");
const {
    PriceModeEnum,
    OfferTypeEnum,
    OfferCategoryEnum,
} = require("../../../Types/OfferTypeEnums");
const offerResponseFormatter = require("../responseFormatter/offerResponseFormatter");
const { uploadFileToS3 } = require("../../../config/s3");
const createOffer = async (formData, userId, locale) => {
    console.log(locale);
    const id = uuidv4();
    const service = "createOffer";
    checkForUnsupportedParameters(
        Forms.offer.createOffer,
        formData,
        EntityNames.offer,
        service
    );
    formDataSchemaValidationErrorHandler(
        OfferValidationSchema,
        formData,
        formErrorMessages[locale].offer.createOffer,
        EntityNames.offer,
        service
    );

    let offer = new Offer({
        ...formData,
        id,
        owner: userId,
        categoryIds: formData.categoryIds,
    });
    await offer.save();
    const redisKey = `offer:${id}`;
    const redisKeyAll = "offers:all";
    await deleteKey(redisKeyAll);
    offer = await offerResponseFormatter(offer);
    await setJson(redisKey, offer, { EX: 3600 });
    return offer;
};

const editOffer = async (offerId, formData, userId, locale) => {
    const service = "editOffer";
    checkForUnsupportedParameters(
        Forms.offer.editOffer,
        formData,
        EntityNames.offer,
        service
    );
    formDataSchemaValidationErrorHandler(
        EditOfferValidationSchema,
        formData,
        formErrorMessages[locale].offer.editOffer,
        EntityNames.offer,
        service
    );
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId",
        };
    }
    let offer = await Offer.get(offerId);
    if (!Offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner !== userId) {
        throw {
            apiErrorCode: "offer.notOwner",
            entityName: EntityNames.offer,
            service,
        };
    }
    offer = await Offer.update({ id: offerId }, formData);
    offer = await offerResponseFormatter(offer);
    const redisKey = `offer:${offerId}`;
    await setJson(redisKey, offer, { EX: 3600 });
    return offer;
};

const getOffer = async (offerId, userId, locale) => {
    const service = "getOffer";
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId",
        };
    }
    const redisKey = `offer:${offerId}`;
    const cachedOffer = await getJson(redisKey);
    if (cachedOffer) {
        return cachedOffer;
    }
    let offer = await Offer.get(offerId);
    if (!offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }

    offer = await offerResponseFormatter(offer);
    await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer;
};

const getOffers = async (formData, userId, locale) => {
    console.log(locale);
    const service = "getOffers";
    const redisKey = "offers:all";
    const cachedOffers = await getJson(redisKey);
    if (cachedOffers) {
        return cachedOffers;
    }
    let offers = await Offer.scan().exec()
    console.log(offers)
    offers = await offerResponseFormatter(offers);
    await setJson(redisKey, offers, { EX: 3600 });
    return offers;
};

const deleteOffer = async (offerId, userId, locale) => {
    console.log(locale);
    const service = "deleteOffer";
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId",
        };
    }
    let offer = await Offer.get(offerId);
    console.log("offer是：", offer);
    if (!Offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner !== userId) {
        console.log(offer.owner, userId);
        throw {
            apiErrorCode: "offer.notOwner",
            entityName: EntityNames.offer,
            service,
        };
    }
    await Offer.delete({ id: offerId });
    const redisKey = `offer:${offerId}`;
    const redisKeyAll = "offers:all";
    await deleteKey(redisKeyAll);
    await deleteKey(redisKey);
    return { status: true };
};

const offerTemplate = (locale) => {
    PriceModeEnum;
    OfferTypeEnum;
    OfferCategoryEnum;
    const priceModes = PriceModeEnum.getAsArray();
    const offerTypes = OfferTypeEnum.getAsArray();
    const offerCategories = OfferCategoryEnum.getAsArray();
    return { priceModes, offerTypes, offerCategories };
};

const uploadOfferImages = async (
    locale,
    userId,
    offerId,
    file,
    serviceName,
    fileType
) => {
    let offer = await Offer.get(offerId);
    console.log("offer是：", offer);
    if (!Offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner !== userId) {
        console.log(offer.owner, userId);
        throw {
            apiErrorCode: "offer.notOwner",
            entityName: EntityNames.offer,
            service,
        };
    }
    const key = getS3Key(fileType, offer.id, serviceName, file.originalname);
    const vfile = await uploadFileToS3(file.buffer, key);
    offer.imageUrl = `http://${process.env.AWS_S3_BUCKET}.s3.localhost.localstack.cloud:4566/${key}`;
    await offer.save();
    offer = await offerResponseFormatter(offer);
    await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer;
};
module.exports = {
    createOffer,
    editOffer,
    getOffer,
    getOffers,
    deleteOffer,
    offerTemplate,
    uploadOfferImages,
};
