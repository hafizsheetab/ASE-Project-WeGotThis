const User = require("../../../Schema/User")
const { PriceModeEnum, OfferCategoryEnum } = require("../../../Types/OfferTypeEnums")
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
    const type = PriceModeEnum.getFromId(offer.typeId)
    const categories = offer.categoryIds.map(cid => OfferCategoryEnum.getFromId(cid.id, cid.subcategoryId))
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
        imageUrls: offer.imageUrls
    }
}