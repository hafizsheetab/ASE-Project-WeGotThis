const Offer = require("../../../Schema/Offer");
const { v4: uuidv4 } = require("uuid");

const Forms = require("../../../Types/Forms");
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters");
const formErrorMessages = require("../../../messages/formErrorMessages");
const EntityNames = require("../../../Types/EntityNames");
// const {
//     storeSessionInRedis,
//     setJson,
//     getJson,
//     deleteKey,
// } = require("../../../utils/redis");
const {
    formDataSchemaValidationErrorHandler,
    getS3Key,
} = require("../../../utils");
const {
    OfferValidationSchema,
    EditOfferValidationSchema,
    OfferGetValidationSchema,
    AddRequestToOfferValidationSchema,
    GiveRatingToOfferValidationSchema,
} = require("../validation");
const {
    PriceModeEnum,
    OfferTypeEnum,
    OfferCategoryEnum,
    OfferStatusEnum,
} = require("../../../Types/OfferTypeEnums");
const offerResponseFormatter = require("../responseFormatter/offerResponseFormatter");
const { uploadFileToS3 } = require("../../../config/s3");
const requestResponseFormatter = require("../responseFormatter/requestResponseFormatter");
const User = require("../../../Schema/User");
const createOffer = async (formData, userId, locale) => {
    console.log(formData);
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
    // const redisKey = `offer:${id}`;
    // const redisKeyAll = "offers:all";
    // await deleteKey(redisKeyAll);
    // await setJson(redisKey, offer, { EX: 3600 });
    offer = await offerResponseFormatter(offer);

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
    // const redisKey = `offer:${offerId}`;
    // await setJson(redisKey, offer, { EX: 3600 });
    // const redisKeyAll = "offers:all";
    // await deleteKey(redisKeyAll);
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
    // const redisKey = `offer:${offerId}`;
    // const cachedOffer = await getJson(redisKey);
    // if (cachedOffer) {
    //     return cachedOffer;
    // }
    let offer = await Offer.get(offerId);
    if (!offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }

    offer = await offerResponseFormatter(offer);
    // await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer;
};

const getOffers = async (formData, userId, locale) => {
    console.log(locale);
    const service = "getOffers";
    // const redisKey = "offers:all";
    // const cachedOffers = await getJson(redisKey);
    // if (cachedOffers) {
    //     return cachedOffers;
    // }
    let offers = await Offer.scan({ availability: true }).exec();
    console.log(offers);
    offers = await offerResponseFormatter(offers);
    // await setJson(redisKey, offers, { EX: 3600 });
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
    // const redisKey = `offer:${offerId}`;
    // const redisKeyAll = "offers:all";
    // await deleteKey(redisKeyAll);
    // await deleteKey(redisKey);
    return { status: true };
};

const getMyOffers = async (userId) => {
    let offers = await Offer.scan({ owner: { eq: userId } }).exec();
    offers = await offerResponseFormatter(offers);
    return offers;
};

const addRequests = async (formData, offerId, userId, locale) => {
    let objectToPush = {};
    const service = "addRequests";
    let offer = await Offer.get(offerId);
    if (!offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner === userId) {
        throw {
            apiErrorCode: "offer.owner",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.requests && offer.requests.find((r) => r.id === userId)) {
        throw {
            apiErrorCode: "offer.alreadyRequested",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.availability === false) {
        throw {
            apiErrorCode: "offer.notAvailable",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.priceModeId === PriceModeEnum.NEGOTIATION.id) {
        checkForUnsupportedParameters(
            Forms.offer.addRequests,
            formData,
            EntityNames.offer,
            service
        );
        console.log(formData);
        formDataSchemaValidationErrorHandler(
            AddRequestToOfferValidationSchema,
            formData,
            formErrorMessages[locale].offer.addRequests,
            EntityNames.offer,
            service
        );
        objectToPush = { id: userId, price: formData.price };
    } else {
        objectToPush = { id: userId, price: offer.price };
    }
    if (!offer.requests) {
        offer.requests = [];
    }
    objectToPush.time = new Date(Date.now());
    offer.requests.push(objectToPush);

    offer = await offer.save({ return: "item" });

    offer = await offerResponseFormatter(offer);
    // const redisKey = `offer:${offerId}`;
    // const redisKeyAll = "offers:all";
    // await deleteKey(redisKeyAll);
    // await deleteKey(redisKey);
    // await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer;
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
    offer.imageUrl = await uploadFileToS3(file.buffer, key);
    await offer.save();
    offer = await offerResponseFormatter(offer);
    // await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer;
};

const getMyRequestsToOffers = async (userId) => {
    let offers = await Offer.scan().exec();
    offers = offers.filter(
        (offer) => offer.requests && offer.requests.find((r) => r.id === userId)
    );
    offers = await offerResponseFormatter(offers);
    const requestsToSend = [];
    for (let offer of offers) {
        console.log(offer);
        let request = offer.requests.find((r) => r.id === userId);
        request = await requestResponseFormatter(request);
        requestsToSend.push({ ...request, offer });
    }
    return requestsToSend;
};

const getRequestsOnMyOffers = async (userId) => {
    let offers = await Offer.scan({
        owner: { eq: userId },
    }).exec();
    offers = offers.filter((offer) => offer.requests);
    const requestsToSend = [];
    offers = await offerResponseFormatter(offers);
    for (let offer of offers) {
        if (offer.requests) {
            const requests = await requestResponseFormatter(offer.requests);
            requests.map((request) => {
                requestsToSend.push({ ...request, offer });
            });
        }
    }
    return requestsToSend;
};

const rejectOfferRequest = async (offerId, userId, requestId) => {
    let offer = await Offer.get(offerId);
    const index = _changeOfferValidityCheck(
        offer,
        userId,
        requestId,
        OfferStatusEnum.REQUESTED.id
    );
    offer.requests[index].statusId = OfferStatusEnum.REJECTED.id;
    await offer.save();
    offer = await offerResponseFormatter(offer);
    return offer;
};

const acceptOfferRequest = async (offerId, userId, requestId) => {
    let offer = await Offer.get(offerId);
    const index = _changeOfferValidityCheck(
        offer,
        userId,
        requestId,
        OfferStatusEnum.REQUESTED.id
    );
    const requestsToPush = [];
    offer.requests.map((request, vIndex) => {
        if (vIndex !== index) {
            request.statusId = OfferStatusEnum.REJECTED.id;
            requestsToPush.push(request);
        } else {
            request.statusId = OfferStatusEnum.ACCEPTED.id;
            requestsToPush.push(request);
        }
    });
    offer.requests = requestsToPush;
    offer.availability = false;
    await offer.save();
    offer = await offerResponseFormatter(offer);
    return offer;
};
const completeOfferRequest = async (offerId, userId, requestId) => {
    let offer = await Offer.get(offerId);
    const index = _changeOfferValidityCheck(
        offer,
        userId,
        requestId,
        OfferStatusEnum.ACCEPTED.id,
        false
    );
    const service = "completeOfferRequest";
    if (offer.owner !== userId && offer.requests[index].id !== userId) {
        throw {
            apiErrorCode: "offer.owner",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner === userId) {
        offer.requests[index].offerOwnerComplete = true;
    } else {
        offer.requests[index].requestOwnerComplete = true;
    }
    if (
        offer.requests[index].offerOwnerComplete &&
        offer.requests[index].requestOwnerComplete
    ) {
        const owner = await User.get(offer.owner)
        const requester = await User.get(offer.requests[index].id)
        if(offer.typeId === OfferTypeEnum.OFFERING.id ){
            owner.servicesOffered += 1
            requester.servicesSeeked += 1
        }
        else{
            owner.servicesSeeked += 1
            requester.servicesOffered += 1
        }
        offer.requests[index].statusId = OfferStatusEnum.COMPLETED.id;
        await owner.save()
        await requester.save()
    }
    await offer.save();
    offer = await offerResponseFormatter(offer);
    return offer;
};
const giveReview = async (offerId, userId, requestId, formData, locale) => {
    let offer = await Offer.get(offerId);
    const service = "giveReview";
    checkForUnsupportedParameters(
        Forms.offer.giveReview,
        formData,
        EntityNames.offer,
        service
    );
    formDataSchemaValidationErrorHandler(
        GiveRatingToOfferValidationSchema,
        formData,
        formErrorMessages[locale].offer.giveReview,
        EntityNames.offer,
        service
    );
    const index = offer.requests.findIndex((r) => r.id === requestId);
    if (index < 0) {
        throw {
            apiErrorCode: "offer.noRequests",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (offer.owner !== userId && offer.requests[index].id !== userId) {
        throw {
            apiErrorCode: "offer.owner",
            entityName: EntityNames.offer,
            service,
        };
    }
    const ratingObject = {...formData, userId, time: new Date(Date.now())}
    let user
    if (offer.owner === userId) {
        if(offer.requests[index].offerOwnerReview){
            throw {
                apiErrorCode: "offer.requestAlreadyProcessed",
                entityName: EntityNames.offer,
                service,
            };
        }
        offer.requests[index].offerOwnerReview = true;
        user = await User.get(offer.requests[index].id)
    } else {
        if(offer.requests[index].requestOwnerReview){
            throw {
                apiErrorCode: "offer.requestAlreadyProcessed",
                entityName: EntityNames.offer,
                service,
            };
        }
        offer.requests[index].requestOwnerReview = true;
        user = await User.get(offer.owner)
    }
    if(!user.ratings){
        user.ratings = []
    }
    user.ratings.push(ratingObject)
    await user.save()
    await offer.save()
    offer = await offerResponseFormatter(offer);
    return offer;
};
const _changeOfferValidityCheck = (
    offer,
    userId,
    requestId,
    statusId,
    checkForOwner = true
) => {
    const service = "changeOfferValidityCheck";
    if (!offer) {
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (checkForOwner && offer.owner !== userId) {
        throw {
            apiErrorCode: "offer.owner",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (!offer.requests) {
        throw {
            apiErrorCode: "offer.noRequests",
            entityName: EntityNames.offer,
            service,
        };
    }
    if (!offer.requests.find((r) => r.id === requestId)) {
        throw {
            apiErrorCode: "offer.requestNotFound",
            entityName: EntityNames.offer,
            service,
        };
    }
    const index = offer.requests.findIndex((r) => r.id === requestId);
    if (offer.requests[index].statusId !== statusId) {
        throw {
            apiErrorCode: "offer.requestAlreadyProcessed",
            entityName: EntityNames.offer,
            service,
        };
    }
    return index;
};
module.exports = {
    createOffer,
    editOffer,
    getOffer,
    getOffers,
    deleteOffer,
    offerTemplate,
    uploadOfferImages,
    getMyOffers,
    addRequests,
    getMyRequestsToOffers,
    getRequestsOnMyOffers,
    rejectOfferRequest,
    acceptOfferRequest,
    completeOfferRequest,
    giveReview
};
