export interface ApiResponseDetail {
    title: string;
    message: string;
    payload: any;
}

export interface ApiBase_Response<T> {
    data: T | null;
    method: string;
    error: ApiResponseDetail | null;
    warning: ApiResponseDetail | null;
}
