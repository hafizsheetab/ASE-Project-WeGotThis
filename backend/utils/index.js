
const path = require("path")
const formatErrors = (errors, errorMessages) => {
    const formErrors = [];
    errors.map((error) => {
        formErrors.push({
            name: error.context.key,
            message: errorMessages[error.context.key],
        });
    });
    return formErrors;
};
const formDataErrorHandler = (error, errorMessages, entityName, service) => {
    const formErrors = formatErrors(error.details, errorMessages);
    throw {
        apiErrorCode: "general.formError",
        formErrors,
        entityName,
        service,
    };
};
const formDataSchemaValidationErrorHandler = (
    schema,
    formData,
    errorMessages,
    entityName,
    service
) => {
    const { error, value } = schema.validate(formData);
    if (error && error.details.length > 0)
        formDataErrorHandler(error, errorMessages, entityName, service);
};

const getIdsOfEnum = (enumObj) => {
    const ids = []
    for(const key of Object.keys(enumObj)){
        if(enumObj[key].id) {
            ids.push(enumObj[key].id)
        }
        
    }
    return ids
}
const getS3Key = (fileType, identifier, serviceName, filename) => {
    return path.join(fileType, identifier, serviceName, Date.now() + "_" + filename);
}
module.exports = {formDataSchemaValidationErrorHandler, getIdsOfEnum, getS3Key}