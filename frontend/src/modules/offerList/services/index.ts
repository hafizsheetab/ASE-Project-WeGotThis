import { OfferResponseBody } from "../../offerCreation/Types";
import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { RatingRequestBody } from "../Types";

export const getMyOffers = async(store: ContextStoreData<ContextData>): Promise<Array<OfferResponseBody> | ErrorBody> => {
    const response = await apiRequest<null, Array<OfferResponseBody>>(urls.myOffers, null, store.context.token, store.context.locale, "get", store)
    return response
}

export const  giveReview = async(store: ContextStoreData<ContextData>, body: RatingRequestBody,offerId: string, requestId: string): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<RatingRequestBody, OfferResponseBody>(urls.giveReview + offerId + "/" + requestId, body, store.context.token, store.context.locale, "put", store)
    return response
}