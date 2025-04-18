const Joi = require('joi');
const { getIdsOfEnum } = require('../../../utils');
const { PriceModeEnum, OfferTypeEnum, OfferCategoryEnum } = require('../../../Types/OfferTypeEnums');
console.log(...getIdsOfEnum(PriceModeEnum))
const OfferValidationSchema=Joi.object({
    title:Joi.string().min(10).max(500).required(),
    description:Joi.string().min(10).max(500).required(),
    location:Joi.string().required(),
    priceModeId:Joi.number().valid(...getIdsOfEnum(PriceModeEnum)).required(),
    price:Joi.number().required(),
    availability:Joi.boolean().default(true),
    typeId:Joi.string().valid(...getIdsOfEnum(OfferTypeEnum)).required(),
    categoryIds:Joi.array().items(Joi.number().valid(...getIdsOfEnum(OfferCategoryEnum))).required(),
    startTime: Joi.number().required(),
    endTime: Joi.number().required()
}).options({abortEarly:false})

const EditOfferValidationSchema = Joi.object({
    title:Joi.string().min(10).max(500).required(),
    description:Joi.string().min(10).max(500).required(),
    location:Joi.string().required(),
    priceModeId:Joi.number().valid(...getIdsOfEnum(PriceModeEnum)).required(),
    price:Joi.number().required(),
    availability:Joi.boolean().default(true),
    typeId:Joi.string().valid(...getIdsOfEnum(OfferTypeEnum)).required(),
    categoryIds:Joi.array().items(Joi.number().valid(...getIdsOfEnum(OfferCategoryEnum))).required(),
    startTime: Joi.number().required(),
    endTime: Joi.number().required()
}).options({ abortEarly: false });


const OfferGetValidationSchema=Joi.object({
    offerId:Joi.string().required()
}).options({abortEarly:false})

const AddRequestToOfferValidationSchema = Joi.object({
    price: Joi.number().required(),
})
module.exports={OfferValidationSchema,EditOfferValidationSchema,OfferGetValidationSchema, AddRequestToOfferValidationSchema}