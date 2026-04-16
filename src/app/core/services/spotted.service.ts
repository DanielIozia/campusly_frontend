import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import * as Spotted_Models from "../models/spotted.models";
import { ToasterService } from "./toaster.service";

@Injectable({
    providedIn: 'root'
})
export class SpottedService {

    private readonly baseUrl = `${environment.apiUrl}/spotted`;

    constructor(
        private http: HttpClient,
        private toasterService: ToasterService
    ) {}

    createSpotted(request: Spotted_Models.CreateSpotted_Request): Observable<Spotted_Models.CreateSpotted_Response> {
        const formData = new FormData();
        formData.append('content', request.content);
        formData.append('category', request.category);
        if (request.isAnonymous !== undefined) {
            formData.append('isAnonymous', String(request.isAnonymous));
        }
        request.images?.forEach(img => formData.append('images', img));

        return this.http.post<Spotted_Models.CreateSpotted_Response>(`${this.baseUrl}/create`, formData).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    updateSpotted(request: Spotted_Models.UpdateSpotted_Request): Observable<Spotted_Models.UpdateSpotted_Response> {
        const formData = new FormData();
        formData.append('content', request.content);
        formData.append('category', request.category);
        request.images?.forEach(img => formData.append('images', img));

        return this.http.put<Spotted_Models.UpdateSpotted_Response>(`${this.baseUrl}/modify`, formData, {
            params: { id: request.id }
        }).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    getSpottedById(id: string): Observable<Spotted_Models.GetSpottedById_Response> {
        return this.http.get<Spotted_Models.GetSpottedById_Response>(`${this.baseUrl}/get`, {
            params: { id }
        }).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    getSpottedByUniversity(params: Spotted_Models.GetSpottedByUniversity_Params): Observable<Spotted_Models.GetSpottedByUniversity_Response> {
        let httpParams = new HttpParams();
        if (params.universityId) httpParams = httpParams.set('universityId', params.universityId);
        if (params.universityName) httpParams = httpParams.set('universityName', params.universityName);
        if (params.category) httpParams = httpParams.set('category', params.category);
        if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
        if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
        if (params.sort) httpParams = httpParams.set('sort', params.sort);

        return this.http.get<Spotted_Models.GetSpottedByUniversity_Response>(`${this.baseUrl}/get-by-university`, {
            params: httpParams
        }).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    listSpotted(filters: Spotted_Models.SpottedFilters): Observable<Spotted_Models.ListSpotted_Response> {
        return this.http.post<Spotted_Models.ListSpotted_Response>(`${this.baseUrl}/list`, filters).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    deleteSpotted(id: string): Observable<Spotted_Models.DeleteSpotted_Response> {
        return this.http.delete<Spotted_Models.DeleteSpotted_Response>(`${this.baseUrl}/delete`, {
            params: { id }
        }).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }

    deleteSpottedImage(id: string, imageId: string): Observable<Spotted_Models.DeleteSpottedImage_Response> {
        return this.http.delete<Spotted_Models.DeleteSpottedImage_Response>(`${this.baseUrl}/delete-image`, {
            params: { id, imageId }
        }).pipe(
            tap({
                error: (err: HttpErrorResponse) => this.toasterService.sendErrorToast(err)
            })
        );
    }
}
