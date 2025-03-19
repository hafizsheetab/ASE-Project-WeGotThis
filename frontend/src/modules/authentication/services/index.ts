import { apiRequest } from "../../shared/services";
import { ContextData, ErrorBody, VoidPositiveResponse } from "../../shared/Types";
import urls from "../../shared/Types/urls";
import { ForgotPasswordRequestBody, LoginRequestBody, RegisterRequestBody, ResetPasswordRequestBody, TokenResponse } from "../Types";

export const login= async (loginFormData: LoginRequestBody, context: ContextData): Promise<TokenResponse | ErrorBody>=> {
  const response = await apiRequest<LoginRequestBody, TokenResponse>(urls.login, loginFormData, context.token, context.locale, "post")
  return response
}

export const register = async (registerFormData: RegisterRequestBody, context: ContextData): Promise<TokenResponse | ErrorBody> => {
    const response = await apiRequest<RegisterRequestBody, TokenResponse>(urls.register, registerFormData, context.token, context.locale, "post")
    return response
}

export const forgotPassword = async (forgotPasswordFormData: ForgotPasswordRequestBody, context: ContextData): Promise<VoidPositiveResponse | ErrorBody> => {
  const response = await apiRequest<ForgotPasswordRequestBody, VoidPositiveResponse>(urls.forgotPassword, forgotPasswordFormData, "", context.locale, "post")
  return response;
}

export const resetPassword = async (resetPasswordFormData: ResetPasswordRequestBody, token: string, context: ContextData): Promise<TokenResponse | ErrorBody> => {
  const response = await apiRequest<ResetPasswordRequestBody, TokenResponse>(urls.resetPassword, resetPasswordFormData, token, context.locale, "post")
  return response
}