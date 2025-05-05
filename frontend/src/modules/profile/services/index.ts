import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody, ReviewResponse, UserResponse } from "../../shared/Types";
import urls from "../../shared/Types/urls";

export const getReviews = async (store: ContextStoreData<ContextData>, userId: string): Promise<ErrorBody | Array<ReviewResponse>> => {
    const response = await apiRequest<null, Array<ReviewResponse>>(urls.getReviews + userId, null, store.context.token, store.context.locale, "get", store)
    return response
}
export const getUser = async (store: ContextStoreData<ContextData>, userId: string): Promise<ErrorBody | UserResponse> => {
    const response = await apiRequest<null, UserResponse>(urls.getUser + userId, null, store.context.token, store.context.locale, "get", store)
    return response
}


