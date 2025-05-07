const { uploadFileToS3 } = require("../../../config/s3");
const formErrorMessages = require("../../../messages/formErrorMessages");
const User = require("../../../Schema/User");
const EntityNames = require("../../../Types/EntityNames");
const Forms = require("../../../Types/Forms");
const {
    formDataSchemaValidationErrorHandler,
    getS3Key,
} = require("../../../utils");
const checkForUnsupportedParameters = require("../../../utils/checkForUnsupportedParameters");
const {
    userResponseFormat,
} = require("../responseFormatter/userResponseFormatter");
const { ChangeSelfValidationSchema } = require("../validation");
const bcrypt = require("bcryptjs");

const getSelf = async (user) => {
    const service = "GETONE";
    return userResponseFormat(user);
};

const changeSelf = async (formData, userId, locale) => {
    const service = "changeSelf";
    checkForUnsupportedParameters(
        Forms.user.changeSelf,
        formData,
        EntityNames.user,
        service
    );
    formDataSchemaValidationErrorHandler(
        ChangeSelfValidationSchema,
        formData,
        formErrorMessages[locale].user.changeSelf
    );

    const {
        expire,
        firstName,
        lastName,
        password,
        phoneNumber,
        location,
        categoryIds,
    } = formData;
    const user = await User.get(userId);
    user.expire = expire;
    user.firstName = firstName;
    user.lastName = lastName;
    if (password) {
        user.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    user.phoneNumber = phoneNumber;
    user.location = location;
    user.categoryIds = categoryIds;
    await user.save();
    return userResponseFormat(user);
};

const uploadProfilePicture = async (userId, file, serviceName, fileType) => {
    const user = await User.get(userId);
    const key = getS3Key(fileType, userId, serviceName, file.originalname);
    user.imageUrl = await uploadFileToS3(file.buffer, key);
    await user.save();
    return userResponseFormat(user);
};
const getUser = async (userId) => {
    const user = await User.get(userId);
    return userResponseFormat(user);
}
const getReviews = async (userId) => {
    const user = await User.get(userId);
    const ratingsArray = [];
    if (user.ratings && user.ratings) {
        for (const rating of user.ratings) {
            let user = await User.get(rating.userId);
            user = userResponseFormat(user);
            ratingsArray.push({ ...rating, user });
        }
    }
    return ratingsArray;
};
module.exports = { getSelf, changeSelf, uploadProfilePicture, getReviews, getUser };
