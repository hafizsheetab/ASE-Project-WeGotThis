module.exports = (popupMessage, resource) => {
    let resourceType
    if(Array.isArray(resource)){
        resourceType = "List"
    }
    else {
        resourceType = "Object"
    }
    let resourceKeys = []
    if(resource){
        if(Array.isArray(resource) && resource.length > 0){
            resourceKeys = Object.keys(resource[0])
        }
        else {
            resourceKeys = Object.keys(resource)
        }
    }
    return {
        status: true,
        statusCode: 200,
        resourceType,
        resourceKeys,
        resource,
        popupMessage
    }
}