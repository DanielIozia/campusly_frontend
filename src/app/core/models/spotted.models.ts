import { ApiBase_Response } from "./api.interfaces";

export interface SpottedImage {
    id: string;
    url: string;
    displayOrder: number;
}

export interface SpottedPost {
    id: string;
    authorId: string;
    content: string;
    category: string;
    isAnonymous: boolean;
    likeCount: number;
    commentCount: number;
    status: string;
    images: SpottedImage[];
    createdAt: string;
    updatedAt: string;
}

// GET /spotted/get
export interface GetSpottedById_Response extends ApiBase_Response<SpottedPost> {}

// GET /spotted/get-by-university
export interface GetSpottedByUniversity_Params {
    universityId?: string;
    universityName?: string;
    category?: string;
    page?: number;
    size?: number;
    sort?: string;
}

export interface SpottedPage {
    content: SpottedPost[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}

export interface GetSpottedByUniversity_Response extends ApiBase_Response<SpottedPage> {}

// POST /spotted/list
export interface SpottedFilters {
    universityId?: string;
}

export interface ListSpotted_Response extends ApiBase_Response<SpottedPost[]> {}

// POST /spotted/create
export interface CreateSpotted_Request {
    content: string;
    category: string;
    isAnonymous?: boolean;
    images?: File[];
}

export interface CreateSpotted_Response extends ApiBase_Response<SpottedPost> {}

// PUT /spotted/modify
export interface UpdateSpotted_Request {
    id: string;
    content: string;
    category: string;
    images?: File[];
}

export interface UpdateSpotted_Response extends ApiBase_Response<SpottedPost> {}

// DELETE /spotted/delete
export interface DeleteSpotted_Response extends ApiBase_Response<null> {}

// DELETE /spotted/delete-image
export interface DeleteSpottedImage_Response extends ApiBase_Response<null> {}

// Legacy aliases
export interface Image extends SpottedImage {}
export interface GetSpotted_Request {
    universityId: string;
    category?: string | null;
    pageable?: object | null;
}
export interface GetSpotted_ResponseData extends ApiBase_Response<null> {}
