const Joi = require("joi")

const ChangeSelfValidationSchema = Joi.object({
    expire: Joi.boolean().required(),
    firstName: Joi.string().min(3).max(32).required(),
    lastName: Joi.string().min(3).max(32).required(),
}).options({abortEarly: false})

module.exports = {ChangeSelfValidationSchema}