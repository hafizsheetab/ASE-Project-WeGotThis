const { OfferCategoryEnum } = require("../../../Types/OfferTypeEnums")

const userResponseFormat = (user) => {
    const categories = user.categoryIds ? user.categoryIds.map(cid => OfferCategoryEnum.getFromId(cid)) : []
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        expire: user.expire,
        id: user.id,
        phoneNumber: user.phoneNumber,
        location: user.location,
        categories,
        imageUrl: user.imageUrl
    }
}

module.exports = {userResponseFormat}