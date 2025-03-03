const errorMessages = require("../../messages/errorMessages");

module.exports = (
    statusCode,
    formErrors,
    entityName,
    service,
    apiErrorCode,
    locale,
    entityId
) => {
    if (!formErrors) {
        formErrors = [];
    }
    if (!locale) {
        locale = "en";
    }
    const errors = errorMessages(entityId)[locale];
    let popupMessage;
    if (!apiErrorCode) {
      popupMessage = errors.general.system
    }
    else {
        const [key, value] = apiErrorCode.split(".")
        console.log(key, value)
        popupMessage = errors[key][value]
    }
    return {
        status: false,
        statusCode,
        formErrors,
        popupMessage,
        entityName,
        service,
    };
};
