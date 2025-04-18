import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody, UserResponse } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { ChangeSelfRequestBody } from "../Types";

export const getSelf = async (store: ContextStoreData<ContextData>): Promise<UserResponse | ErrorBody> => {
    const response = await apiRequest<null, UserResponse>(urls.getSelf, null, store.context.token, store.context.locale, "get", store)
    return response
}

export const uploadProfilePicture = async (formData: FormData, store: ContextStoreData<ContextData>): Promise<UserResponse | ErrorBody> => {
  const response = await apiRequest<FormData, UserResponse>(urls.changePic , formData, store.context.token, store.context.locale, "put", store)
  return response
}

export const changeSelf = async (payload: ChangeSelfRequestBody, store: ContextStoreData<ContextData>): Promise<UserResponse | ErrorBody> => {
  const response = await apiRequest<ChangeSelfRequestBody, UserResponse>(urls.changeSelf, payload, store.context.token, store.context.locale, "put", store)
  return response
}


