import { apiRequest } from "../../shared/services";
import { ContextData, ContextStoreData, ErrorBody, VoidPositiveResponse } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { ForgotPasswordRequestBody, LoginRequestBody, RegisterRequestBody, ResetPasswordRequestBody, TokenResponse } from "../Types";

export const login= async (loginFormData: LoginRequestBody, store: ContextStoreData<ContextData>): Promise<TokenResponse | ErrorBody>=> {

  const response = await apiRequest<LoginRequestBody, TokenResponse>(urls.login, loginFormData, store.context.token, store.context.locale, "post", store)
  return response
}

export const register = async (registerFormData: RegisterRequestBody, store: ContextStoreData<ContextData>): Promise<TokenResponse | ErrorBody> => {
    const response = await apiRequest<RegisterRequestBody, TokenResponse>(urls.register, registerFormData, store.context.token, store.context.locale, "post", store)
    return response
}

export const forgotPassword = async (forgotPasswordFormData: ForgotPasswordRequestBody, store: ContextStoreData<ContextData>): Promise<VoidPositiveResponse | ErrorBody> => {
  const response = await apiRequest<ForgotPasswordRequestBody, VoidPositiveResponse>(urls.forgotPassword, forgotPasswordFormData, "", store.context.locale, "post", store)
  return response;
}

export const resetPassword = async (resetPasswordFormData: ResetPasswordRequestBody, token: string, store: ContextStoreData<ContextData>): Promise<TokenResponse | ErrorBody> => {
  const response = await apiRequest<ResetPasswordRequestBody, TokenResponse>(urls.resetPassword, resetPasswordFormData, token, store.context.locale, "post", store)
  return response
}