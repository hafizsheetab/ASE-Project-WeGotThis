import { apiRequest } from "../../shared/services";
import { ContextData, ErrorBody } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { LoginRequestBody, RegisterRequestBody, TokenResponse } from "../Types";

export const login= async (loginFormData: LoginRequestBody, context: ContextData): Promise<TokenResponse | ErrorBody>=> {
  const response = await apiRequest<LoginRequestBody, TokenResponse>(urls.login, loginFormData, context.token, context.locale, "post")
  return response
}

export const register = async (registerFormData: RegisterRequestBody, context: ContextData): Promise<TokenResponse | ErrorBody> => {
    const response = await apiRequest<RegisterRequestBody, TokenResponse>(urls.register, registerFormData, context.token, context.locale, "post")
    return response
}