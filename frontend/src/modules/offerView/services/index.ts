import { OfferResponseBody } from "../../offerCreation/Types";
import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody, UserResponse } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { AddRequestToOfferRequestBody } from "../Types";

export const addRequestToOffer = async(offerId: string, body: AddRequestToOfferRequestBody, store: ContextStoreData<ContextData>): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<AddRequestToOfferRequestBody, OfferResponseBody>(urls.addRequestToOffer + offerId, body, store.context.token, store.context.locale, "put", store)
    return response
}

export const getSelf = async (store: ContextStoreData<ContextData>): Promise<UserResponse | ErrorBody> => {
    const response = await apiRequest<null, UserResponse>(urls.getSelf, null, store.context.token, store.context.locale, "get", store)
    return response
}