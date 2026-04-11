import { ApiBase_Response } from "./api.interfaces";
import { Login_Response } from "./auth.models";


// ==== used on endpoint: POST register/send-otp ====
export interface SendOtp_Request {
  email: string;
}
export interface SendOtp_ResponseData extends ApiBase_Response<null> { }

// ==== used on endpoint: POST register/verify-otp ====
export interface VerifyOtp_Request {
  email: string;
  otpCode: string;
}
export interface VerifyOtp_ResponseData extends ApiBase_Response<null> { }

// ==== used on endpoint: POST register/complete ====
export interface CompleteRegistration_Request {
  email: string;
  password: string;
  firstName: string;
  username: string;
  lastName: string;
  birthDate: {
    day: number;
    month: number;
    year: number;
  }
}
export interface CompleteRegistration_ResponseData extends ApiBase_Response<Login_Response> { }


// ==== used on endpoint: POST register/resend-otp ====
export interface ResendOtp_Request {
  email: string;
}
export interface ResendOtp_ResponseData extends ApiBase_Response<null> { }

