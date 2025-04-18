import { OfferResponseBody } from "../../offerCreation/Types";
import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { AddRequestToOfferRequestBody } from "../Types";

export const addRequestToOffer = async(offerId: string, body: AddRequestToOfferRequestBody, store: ContextStoreData<ContextData>): Promise<OfferResponseBody | ErrorBody> => {
    const response = await apiRequest<AddRequestToOfferRequestBody, OfferResponseBody>(urls.addRequestToOffer + offerId, body, store.context.token, store.context.locale, "put", store)
    return response
}