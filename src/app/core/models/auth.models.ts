// =============================================================================
// - login
// - me 
// - forgot-password
// - verify-password-otp
// - reset-password
// =============================================================================


import { ApiBase_Response } from "./api.interfaces";


// interfaces used on endpoint: POST /auth/login
export interface Login_Request {
    email: string;
    password: string;
}
export type UserRole = 'CAMPUSLY_USER'; //! aggiungere altri ruoli in futuro 
export interface Login_Response {
    id: string,
    username: string,
    email: string,
    role: UserRole
}
export interface Login_ResponseData extends ApiBase_Response<Login_Response> { }


// interfaces used on endpoint: POST /auth/me
export interface Me_ResponseData extends ApiBase_Response<Login_Response> { }


// interfaces used on endpoint: POST /auth/forgot-password
export interface ForgotPassword_Request {
    email: string;
}
export interface ForgotPassword_ResponseData extends ApiBase_Response<null> { }


//interfaces used on endpoint: POST /auth/verify-password-otp
export interface VerifyPasswordOtp_Request {
    email: string;
    otpCode: string;
}
export interface VerifyPasswordOtp_ResponseData extends ApiBase_Response<null> { }


//interfaces used on endpoint: POST /auth/reset-password
export interface ResetPassword_Request {
    email: string;
    newPassword: string;
}
export interface ResetPassword_ResponseData extends ApiBase_Response<Login_Response> { }




