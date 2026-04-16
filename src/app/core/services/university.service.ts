import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { ApiBase_Response } from "../models/api.interfaces";
import * as University_Models from "../models/university.models";
import { ToasterService } from "./toaster.service";

@Injectable({
    providedIn: 'root'
})
export class UniversityService {

    private readonly baseUrl = `${environment.apiUrl}`;

    constructor(
        private http: HttpClient,
        private toasterService: ToasterService
    ) {}

    getUniversities(): Observable<ApiBase_Response<University_Models.University[]>> {
        return this.http.get<ApiBase_Response<University_Models.University[]>>(`${this.baseUrl}/universities`).pipe(
            tap({
                error: (err: HttpErrorResponse) => {
                    this.toasterService.sendErrorToast(err);
                }
            })
        );
    }

    setUserUniversity(universityId: string): Observable<ApiBase_Response<null>> {
        return this.http.put<ApiBase_Response<null>>(`${this.baseUrl}/users/university`, { universityId }).pipe(
            tap({
                error: (err: HttpErrorResponse) => {
                    this.toasterService.sendErrorToast(err);
                }
            })
        );
    }
}
