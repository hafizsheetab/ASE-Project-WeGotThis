const Offer=require('../../../schema/Offer');
const { v4: uuidv4 } = require('uuid');

const Forms = require("../../../Types/Forms")
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters")
const formErrorMessages = require("../../../messages/formErrorMessages")
const EntityNames = require("../../../Types/EntityNames")
const { storeSessionInRedis,setJson, getJson,deleteKey } = require("../../../utils/redis")
const { formDataSchemaValidationErrorHandler } = require("../../../utils")
const {OfferValidationSchema,OfferGetValidationSchema} = require("../validation")
const createOffer = async (formData, userId, locale) => {
    console.log(locale)
    const id=uuidv4()
    const service = "createOffer"
    checkForUnsupportedParameters(Forms.offer.createOffer, formData, EntityNames.offer, service)
    formDataSchemaValidationErrorHandler(OfferValidationSchema, formData, formErrorMessages[locale].offer.createOffer, EntityNames.offer, service)
    const {title,description,images,location,priceMode,price,startingPrice,availability,type,categories,estimatedTime,status}=formData
    const finalPrice = priceMode === "fixed" ? price : null;
    const finalStartingPrice = priceMode === "negotiation" ? startingPrice : null;
    const offer = new Offer({
        id,
        owner:userId,
        title,
        description,
        images:images || [],
        location,
        priceMode,
        price:finalPrice,
        startingPrice:finalStartingPrice,
        availability:availability ?? true,
        type,
        categories:categories || [],
        estimatedTime:estimatedTime || "active",
        status,
    })
    await offer.save()
    const redisKey = `offer:${id}`;
    await setJson(redisKey, offer, { EX: 3600 });
    return offer
};

const editOffer = async (offerId,formData, userId, locale) => {
    console.log(locale)
    const service = "editOffer"
    checkForUnsupportedParameters(Forms.offer.editOffer, formData, EntityNames.offer, service)
    formDataSchemaValidationErrorHandler(OfferValidationSchema, formData, formErrorMessages[locale].offer.editOffer, EntityNames.offer, service)
    const {title,description,images,location,priceMode,price,startingPrice,availability,type,categories,estimatedTime,status}=formData
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId"
        };
    }
    let offer=await Offer.get(offerId)
    if(!Offer){
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        }
    }
    if(offer.owner !== userId){
        throw {
            apiErrorCode: "offer.notOwner",
            entityName: EntityNames.offer,
            service,
        }
    }
    const updatedOffer={
        ...offer,
        ...formData,
        updatedAt:new Date().toISOString()
    }
    await Offer.update({ id: offerId }, updatedOffer);
    const redisKey = `offer:${offerId}`;
    await setJson(redisKey, updatedOffer, { EX: 3600 });
    return updatedOffer
};

const getOffer = async (offerId,formData, userId, locale) => {
    console.log(locale)
    const service = "getOffer"
    checkForUnsupportedParameters(Forms.offer.getOffer, formData, EntityNames.offer, service)
    formDataSchemaValidationErrorHandler(OfferGetValidationSchema, formData, formErrorMessages[locale].offer.getOffer, EntityNames.offer, service)
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId"
        };
    }
    const redisKey=`offer:${offerId}`;
    const cachedOffer=await getJson(redisKey);
    if(cachedOffer){
        return cachedOffer
    }
    const offer=await Offer.get(offerId)
    if(!Offer){
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        }
    }
    await setJson(`offer:${offerId}`, offer, { EX: 3600 });
    return offer
};

const getOffers = async (formData, userId, locale) => {
    console.log(locale)
    const service = "getOffers"
    checkForUnsupportedParameters(Forms.offer.getOffers, formData, EntityNames.offer, service)
    formDataSchemaValidationErrorHandler(OfferValidationSchema, formData, formErrorMessages[locale].offer.getOffers, EntityNames.offer, service)
    const redisKey='offers:all';
    const cachedOffers=await getJson(redisKey);
    if(cachedOffers){
        return cachedOffers
    }
    const offers=await Offer.scan().exec();
    await setJson(redisKey, offers, { EX: 3600 });
    return offers
};

const deleteOffer = async (offerId,formData, userId, locale) => {
    console.log(locale)
    const service = "deleteOffer"
    //todo
    checkForUnsupportedParameters(Forms.offer.deleteOffer, formData, EntityNames.offer, service)
    formDataSchemaValidationErrorHandler(OfferGetValidationSchema, formData, formErrorMessages[locale].offer.deleteOffer, EntityNames.offer, service)
    if (!offerId) {
        throw {
            statusCode: 400,
            message: "Missing offerId"
        };
    }
    let offer=await Offer.get(offerId)
    if(!Offer){
        throw {
            apiErrorCode: "offer.notFound",
            entityName: EntityNames.offer,
            service,
        }
    }
    if(offer.owner !== userId){
        throw {
            apiErrorCode: "offer.notOwner",
            entityName: EntityNames.offer,
            service,
        }
    }
    await Offer.delete(id:offerId})
    const redisKey = `offer:${offerId}`;
    //todo
    await deleteKey(redisKey);
    return {status: true}
};

module.exports = {createOffer, editOffer, getOffer, getOffers, updateOffer, deleteOffer}