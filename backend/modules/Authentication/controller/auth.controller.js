const User = require("../../../Schema/User")
const EntityNames = require("../../../Types/EntityNames")
const bcrypt = require("bcryptjs")
const { createToken } = require("../../../utils/jwt")
const { storeSessionInRedis } = require("../../../utils/redis")
const { v4: uuidv4 } = require('uuid');
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters")
const Forms = require("../../../Types/Forms")
const { formDataSchemaValidationErrorHandler } = require("../../../utils")
const { UserLoginValidationSchema, UserRegistrationValidationSchema } = require("../validation")
const formErrorMessages = require("../../../messages/formErrorMessages")
const loginUser = async(formData, locale) => {
    console.log(locale)
    const service = "login"
    checkForUnsupportedParameters(Forms.auth.login, formData, EntityNames.auth, service)
    formDataSchemaValidationErrorHandler(UserLoginValidationSchema, formData, formErrorMessages[locale].auth.login, EntityNames.auth, service)
    const {email, password, expire} = formData
    const results = await User.query("email").eq(email).exec()
    if(results.length === 0){
        throw {
            apiErrorCode: "auth.invalidCredentials",
            entityName: EntityNames.auth,
            service,
        }
    }
    const user = results[0]
    const compare = bcrypt.compareSync(password, user.passwordHash)
    if(!compare){
        throw {
            apiErrorCode: "auth.invalidCredentials",
            entityName: EntityNames.auth,
            service,
        }
    }
    user.expire = expire
    await user.save()
    const token = createToken(user.id, user.expire)
    await storeSessionInRedis({identifier: user.id, expire})
    return token
    
}

const registerUser = async (formData, locale) => {
    const {email, password, firstName, lastName, expire} = formData
    const id = uuidv4()
    const service = "register"
    checkForUnsupportedParameters(Forms.auth.register, formData, EntityNames.auth, service)
    formDataSchemaValidationErrorHandler(UserRegistrationValidationSchema, formData, formErrorMessages[locale].auth.register, EntityNames.auth, service)
    const results = await User.query("email").eq(email).exec()
    if(results.length  > 0){
        throw {
            apiErrorCode: "auth.alreadyExists",
            entityName: EntityNames.auth,
            service,
        }
    }
    
    const user = new User({
        id,
        email,
        passwordHash: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        firstName,
        lastName,
        expire

    })
    await user.save()
    const token = createToken(user.id, user.expire)
    await storeSessionInRedis({identifier: user.id, expire})
    return token
}

module.exports = {loginUser, registerUser}