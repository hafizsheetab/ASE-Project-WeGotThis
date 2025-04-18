const Joi = require("joi")
const { getIdsOfEnum } = require("../../../utils")
const { OfferCategoryEnum } = require("../../../Types/OfferTypeEnums")

const ChangeSelfValidationSchema = Joi.object({
    expire: Joi.boolean().required(),
    firstName: Joi.string().min(3).max(32).required(),
    lastName: Joi.string().min(3).max(32).required(),
    password: Joi.string().min(6).max(32).allow(null, ""),
    phoneNumber: Joi.string().regex(/^\+41\d{9}$/),
    location: Joi.string().min(6).max(100).required(),
    categoryIds:Joi.array().items(Joi.number().valid(...getIdsOfEnum(OfferCategoryEnum))).required(),
}).options({abortEarly: false})

module.exports = {ChangeSelfValidationSchema}