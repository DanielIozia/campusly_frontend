import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  healthCheck() {
    return this.http.get<{ status: string; message: string; timestamp: string }>(
      `${this.baseUrl}/health`
    );
  }
}
