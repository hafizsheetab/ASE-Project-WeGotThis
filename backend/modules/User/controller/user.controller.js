const formErrorMessages = require("../../../messages/formErrorMessages");
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters");
const formatJoiFormErrors = require("../../../utils/formatJoiFormErrors");
const EntityNames = require("../../../Types/EntityNames");
const Forms = require("../../../Types/Forms");
const User = require("../Model/User");
const { userResponseFormat } = require("../responseFormatter/userResponseFormatter");
const UserCreationValidationSchema = require("../validation/UserCreationValidationSchema");
const UserLoginValidationSchema = require("../validation/UserLoginValidationSchema");
const entityName = EntityNames.user;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginUser = async (formData, locale) => {
    const service = "LOGIN";
    checkForUnsupportedParameters(
        Forms.user.login,
        formData,
        entityName,
        service
    );
    const { error, value } = UserLoginValidationSchema.validate(formData);
    if (error && error.details.length > 0) {
        const formErrors = formatJoiFormErrors(
            error.details,
            formErrorMessages[locale].user.login
        );
        throw {
            apiErrorCode: "general.formError",
            formErrors,
            entityName,
            service,
        };
    }
    const {email, password} = formData
    const user = await User.findOne({email: email})
    if(!user){
        throw {
            apiErrorCode: "user.invalidCredentials",
            entityName,
            service,
        };
    }
    const compare = bcrypt.compareSync(password, user.passwordHash)
    if(!compare){
        throw {
            apiErrorCode: "user.invalidCredentials",
            entityName,
            service,
        };
    }
    return _generateToken({_id: user._id})
};

const createUser = async (formData, locale) => {
    const service = "CREATEUSER"
    checkForUnsupportedParameters(Forms.user.createUser, formData, entityName, service)
    const { error, value } = UserCreationValidationSchema.validate(formData);
    if (error && error.details.length > 0) {
        const formErrors = formatJoiFormErrors(
            error.details,
            formErrorMessages[locale].user.create
        );
        throw {
            apiErrorCode: "general.formError",
            formErrors,
            entityName,
            service,
        };
    }
    const {email, name, password} = formData
    let user = await User.findOne({email})
    if(user){
        throw {
            apiErrorCode: "user.alreadyExists",
            entityName,
            service
        }
    }
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    user = new User({
        email,
        name, 
        passwordHash
    })
    await user.save()
    return _generateToken({_id: user._id})
}

const getOneUser = async (userId, locale) => {
    const service = "GETONE"
    const user = await User.findById(userId)
    if(!user){
        throw {
            apiErrorCode: "user.notFound",
            entityName,
            service
        }
    }
    return userResponseFormat(user)
}

const _generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600})
    return {
        token
    }
}

module.exports = {loginUser, createUser, getOneUser}