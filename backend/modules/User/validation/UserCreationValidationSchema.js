const Joi = require("joi")

const UserCreationValidationSchema = Joi.object({
    email: Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).allow(null, '').required(),
    password: Joi.string().min(6).max(32).required(),
    name: Joi.string().min(6).max(32).required()
}).options({abortEarly: false})

module.exports = UserCreationValidationSchema