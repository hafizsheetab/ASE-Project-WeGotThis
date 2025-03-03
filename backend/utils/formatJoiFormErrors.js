module.exports = (errors, errorMessages) => {
    const formErrors = []
    errors.map(error => {
        formErrors.push({
            name: error.context.key,
            message: errorMessages[error.context.key]
        })
    })
    return formErrors
}