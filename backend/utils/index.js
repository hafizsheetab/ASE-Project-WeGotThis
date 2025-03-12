
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

module.exports = {formDataSchemaValidationErrorHandler}