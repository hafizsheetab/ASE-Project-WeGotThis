import { apiRequest } from "../../shared/services"
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types"
import urls from "../../shared/Types/urls"
import { OfferRequestBody, OfferResponseBody, OfferTemplateResponse } from "../Types"

export const getOfferCreationTemplate= async ( store: ContextStoreData<ContextData>): Promise<OfferTemplateResponse | ErrorBody>=> {
  const response = await apiRequest<null, OfferTemplateResponse>(urls.getOfferCreationTemplate, null, store.context.token, store.context.locale, "get", store)
  return response
}

export const createOffer = async (formData: OfferRequestBody,store: ContextStoreData<ContextData>): Promise<OfferResponseBody | ErrorBody> => {
  const response = await apiRequest<OfferRequestBody, OfferResponseBody>(urls.createOffer, formData, store.context.token, store.context.locale, "post", store)
  return response;
}

export const uploadOfferImage = async (formData: FormData, store: ContextStoreData<ContextData>, offerId: string): Promise<OfferResponseBody | ErrorBody> => {
  const response = await apiRequest<FormData, OfferResponseBody>(urls.uploadOfferImage + offerId, formData, store.context.token, store.context.locale, "put", store)
  return response
}