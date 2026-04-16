import { ApiBase_Response } from "./api.interfaces";

export interface University {
    id: string;
    name: string;
    country: string;
    city: string;
    shortName: string;
    logoUrl: string;
}

export interface GetUniversities_Response extends ApiBase_Response<University[]> {}
