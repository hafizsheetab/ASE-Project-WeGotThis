const User = require("../../../Schema/User")
const { PriceModeEnum, OfferCategoryEnum, OfferTypeEnum } = require("../../../Types/OfferTypeEnums")
const { userResponseFormat } = require("../../User/responseFormatter/userResponseFormatter")

module.exports = async(offer) => {
 if(Array.isArray(offer)){
    offer = await Promise.all(offer.map(o => _formatResponse(o)))
 }
 else {
    offer = await _formatResponse(offer)
 }
 return offer

}

const _formatResponse = async (offer) => {
    const priceMode = PriceModeEnum.getFromId(offer.priceModeId)
    const type = OfferTypeEnum.getFromId(offer.typeId)
    const categories = offer.categoryIds.map(cid => OfferCategoryEnum.getFromId(cid))
    let owner = await User.get(offer.owner)
    owner = userResponseFormat(owner)
    return {
        id: offer.id,
        owner,
        title: offer.title,
        description: offer.description,
        location: offer.location,
        priceMode,
        type,
        categories,
        price: offer.price,
        availability: offer.availability,
        startTime: offer.startTime,
        endTime: offer.endTime,
        imageUrl: offer.imageUrl,
        requests: offer.requests ? offer.requests : [],
        createdAt: offer.createdAt
    }
}