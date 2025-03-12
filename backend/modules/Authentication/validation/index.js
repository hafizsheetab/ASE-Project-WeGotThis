const Joi = require("joi")

const UserLoginValidationSchema = Joi.object({
    email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).allow(null, '').required(),
    password: Joi.string().min(6).max(32).required(),
    expire: Joi.boolean().required()
}).options({abortEarly: false})


const UserRegistrationValidationSchema = Joi.object({
    email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).allow(null, '').required(),
    password: Joi.string().min(6).max(32).required(),
    expire: Joi.boolean().required(),
    firstName: Joi.string().min(3).max(32).required(),
    lastName: Joi.string().min(3).max(32).required(),
}).options({abortEarly: false})


module.exports = {UserLoginValidationSchema, UserRegistrationValidationSchema}