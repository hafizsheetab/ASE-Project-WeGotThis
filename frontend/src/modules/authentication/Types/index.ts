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