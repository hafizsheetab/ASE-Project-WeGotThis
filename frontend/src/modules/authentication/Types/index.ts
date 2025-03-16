export interface LoginFormBody {
    email: string,
    password: string,
    isPasswordVisible: boolean
}

export interface RegisterFormBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    isPasswordVisible: boolean,
    agreedToTerms: boolean,
}

export interface LoginRequestBody {
    email: string,
    password: string,
    expire: boolean
}

export interface RegisterRequestBody {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    expire: boolean
}

export interface TokenResponse {
    "access_token": string
    "token_type": string
    "expires_in": number
    "identifier": string
}

