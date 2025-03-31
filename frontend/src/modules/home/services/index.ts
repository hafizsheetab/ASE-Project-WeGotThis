import { OfferResponseBody } from "../../offerCreation/Types"
import { apiRequest } from "../../shared/services"
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types"
import urls from "../../shared/Types/urls"

export const getAllOffers= async ( store: ContextStoreData<ContextData>): Promise<Array<OfferResponseBody> | ErrorBody>=> {
  const response = await apiRequest<null, Array<OfferResponseBody>>(urls.getAllOffers, null, store.context.token, store.context.locale, "get", store)
  return response
}

export const getOneOffer = async(offerId: string, store: ContextStoreData<ContextData>): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<null, OfferResponseBody>(urls.getOneOffer + offerId, null, store.context.token, store.context.locale, "get", store)
    return response
}