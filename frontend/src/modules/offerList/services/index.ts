import { OfferResponseBody } from "../../offerCreation/Types";
import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types";
import urls from "../../shared/Types/urls";

export const getMyOffers = async(store: ContextStoreData<ContextData>): Promise<Array<OfferResponseBody> | ErrorBody> => {
    const response = await apiRequest<null, Array<OfferResponseBody>>(urls.myOffers, null, store.context.token, store.context.locale, "get", store)
    return response
}   