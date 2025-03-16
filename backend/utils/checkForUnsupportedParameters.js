module.exports = (parameterList, formData, entityName, service) => {
    console.log(parameterList)
    for(const key of Object.keys(formData)){
        console.log(key)
        if(!parameterList.includes(key)){
            throw {
                apiErrorCode: "general.unsupportedParameters",
                entityName, 
                service
            }
        }
    }
}