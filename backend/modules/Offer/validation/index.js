const Joi = require('joi')

const OfferValidationSchema=Joi.object({
    title:Joi.string().min(10).max(500).required(),
    description:Joi.string().min(10).max(500).required(),
    images:Joi.array().items(Joi.string().uri()).required(),
    //TODO: check if this is right
    location:Joi.object({
        address:Joi.string().required(),
    }),
    priceMode:Joi.string().valid('fixed','negotiation').required(),
    price:Joi.number().when('priceMode',{
        is:'fixed',
        then:Joi.number().required()
    }),
    startingPrice: Joi.number()
        .when('priceMode', {
            is: 'negotiation',
            then: Joi.required(),
            otherwise: Joi.strip() // remove the field from the output
        }),
    availability:Joi.boolean().default(true),
    type:Joi.string().valid('offering','seeking').required(),
    categories:Joi.array().items(Joi.string().required()).required(),
    estimatedTime: Joi.number().integer().positive().required(),
    status:Joi.string().valid('active','inactive').default('active')

}).options({abortEarly:false})

const EditOfferValidationSchema = Joi.object({
    title: Joi.string().min(10).max(500),
    description: Joi.string().min(10).max(500),
    images: Joi.array().items(Joi.string().uri()),
    location: Joi.object({
        address: Joi.string()
    }),
    priceMode: Joi.string().valid('fixed', 'negotiation'),
    price: Joi.number(),
    startingPrice: Joi.number(),
    availability: Joi.boolean(),
    type: Joi.string().valid('offering', 'seeking'),
    status: Joi.string().valid('active', 'inactive'),
    categories: Joi.array().items(Joi.string()),
    estimatedTime: Joi.number().integer().positive()
}).options({ abortEarly: false });


const OfferGetValidationSchema=Joi.object({
    offerId:Joi.string().required()
}).options({abortEarly:false})

module.exports={OfferValidationSchema,EditOfferValidationSchema,OfferGetValidationSchema}