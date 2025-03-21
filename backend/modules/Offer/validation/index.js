const Joi = require('joi');

const OfferValidationSchema=Joii.object({
    owner:Joi.string().required(),
    title:Joi.string().min(10).max(500).required(),
    description:Joi.string().min(10).max(500).required(),
    images:Joi.array().items(Joi.string().uri()).required(),
    //TODO: check if this is right
    location:Joi.object({
        address.
    }),
    priceMode:Joi.string().valid('fixed','negotiation').required(),
    price:Joi.number().when('priceMode',{
        is:'fixed',
        then:Joi.number().required()
    }),
    startingPrice:Joi.number().when('priceMode',{
        is:'negotiation',
        then:Joi.number().required()
    }),
    availability:Joi.boolean().default(true),
    type:Joi.string().valid('offering','seeking').required(),
    categories:Joi.array().items(Joi.string().required()).required(),
    estimatedTime: Joi.number().integer().positive().required(),
    status:Joi.string().valid('active','inactive').default('active')

}).options({abortEarly:false})

const OfferGetValidationSchema=Joi.object({
    offerId:Joi.string().required()
}).options({abortEarly:false})

const OffersGetValidationSchema=Joi.object({
    userId:Joi.string().required()
}