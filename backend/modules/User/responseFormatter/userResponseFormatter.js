const { OfferCategoryEnum } = require("../../../Types/OfferTypeEnums")

const userResponseFormat = (user) => {
    const categories = user.categoryIds ? user.categoryIds.map(cid => OfferCategoryEnum.getFromId(cid)) : []
    let rating = -1
    if(user.ratings && user.ratings.length > 0){
        let sum = 0
        user.ratings.map(r => {
            sum += r.rating
        })
        rating = sum / user.ratings.length
    }
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        expire: user.expire,
        id: user.id,
        phoneNumber: user.phoneNumber,
        location: user.location,
        categories,
        imageUrl: user.imageUrl,
        rating,
        time: user.createdAt,
        servicesOffered: user.servicesOffered ? user.servicesOffered : 0,
        servicesSeeked: user.servicesSeeked ? user.servicesSeeked : 0
    }
}

module.exports = {userResponseFormat}