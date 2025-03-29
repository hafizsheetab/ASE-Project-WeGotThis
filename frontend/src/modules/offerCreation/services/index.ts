import { apiRequest } from "../../shared/services"
import { ContextData, ContextStoreData, ErrorBody } from "../../shared/Types"
import urls from "../../shared/Types/urls"
import { OfferTemplateResponse } from "../Types"

export const getOfferCreationTemplate= async ( store: ContextStoreData<ContextData>): Promise<OfferTemplateResponse | ErrorBody>=> {
  const response = await apiRequest<null, OfferTemplateResponse>(urls.getOfferCreationTemplate, null, store.context.token, store.context.locale, "get", store)
  return response
}