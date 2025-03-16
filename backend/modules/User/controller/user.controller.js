const formErrorMessages = require("../../../messages/formErrorMessages")
const User = require("../../../Schema/User")
const EntityNames = require("../../../Types/EntityNames")
const Forms = require("../../../Types/Forms")
const { formDataSchemaValidationErrorHandler } = require("../../../utils")
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters")
const { userResponseFormat } = require("../responseFormatter/userResponseFormatter")
const { ChangeSelfValidationSchema } = require("../validation")



const getSelf = async (user) => {
    const service = "GETONE"
    return userResponseFormat(user)
}

const changeSelf = async(formData, userId, locale) => {
    const service = "changeSelf"
    checkForUnsupportedParameters(Forms.user.changeSelf, formData, EntityNames.user, service)
    formDataSchemaValidationErrorHandler(ChangeSelfValidationSchema, formData, formErrorMessages[locale].user.changeSelf)
    const {expire, firstName, lastName} = formData
    const user = await User.get(userId)
    user.expire = expire
    user.firstName = firstName
    user.lastName = lastName
    await user.save()
    return userResponseFormat(user)
}
module.exports = {getSelf, changeSelf}