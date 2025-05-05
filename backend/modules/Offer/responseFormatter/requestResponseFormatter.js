const User = require("../../../Schema/User")
const { OfferStatusEnum } = require("../../../Types/OfferTypeEnums")
const { userResponseFormat } = require("../../User/responseFormatter/userResponseFormatter")

module.exports = async(request) => {
    if(Array.isArray(request)){
       request = await Promise.all(request.map(o => _formatResponse(o)))
    }
    else {
       request = await _formatResponse(request)
    }
    return request
   
   }
   
   const _formatResponse = async (request) => {
      let user = await User.get(request.id)
      user = userResponseFormat(user)
      const status = OfferStatusEnum.getFromId(request.statusId)
      return {
        user,
        status,
        price: request.price,
        offerOwnerReview: request.offerOwnerReview,
        requestOwnerReview: request.requestOwnerReview,
        requestOwnerComplete: request.requestOwnerComplete,
        offerOwnerComplete: request.offerOwnerComplete,
        time: request.time
      }
   }