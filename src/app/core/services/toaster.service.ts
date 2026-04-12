import { Injectable, signal } from '@angular/core';
import { ApiBase_Response } from '../models/api.interfaces';
import { HttpErrorResponse } from '@angular/common/http';


export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
  removing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  // Durata animazione di uscita in ms — deve corrispondere a $exit-duration in SCSS
  private static readonly EXIT_DURATION = 300;

  readonly toasts = signal<Toast[]>([]);

  // Mostra automaticamente errore o warning dalla risposta API standard
  showFromResponse<T>(response: ApiBase_Response<T>): void {
    if (response.error) {
      this.error(response.error.title, response.error.message);
    } else if (response.warning) {
      this.warning(response.warning.title, response.warning.message);
    }
  }

  success(title: string, message?: string): void {
    this.add({ type: 'success', title, message, duration: 4000 });
  }

  error(title: string, message?: string): void {
    this.add({ type: 'error', title, message, duration: 6000 });
  }

  warning(title: string, message?: string): void {
    this.add({ type: 'warning', title, message, duration: 5000 });
  }

  dismiss(id: string): void {
    // Prima imposta removing per triggerare l'animazione di uscita
    this.toasts.update(list =>
      list.map(t => t.id === id ? { ...t, removing: true } : t)
    );
    // Poi rimuove dopo che l'animazione è completata
    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t.id !== id));
    }, ToasterService.EXIT_DURATION);
  }

  private add(toast: Omit<Toast, 'id' | 'removing'>): void {
    const id = crypto.randomUUID();
    this.toasts.update(list => [...list, { ...toast, id, removing: false }]);
    setTimeout(() => this.dismiss(id), toast.duration);
  }

  public sendErrorToast(err: HttpErrorResponse): void {
    if (err.error) {
      if (err.error.error) {
        const title = err.error.error.title;
        const message = err.error.error.message;
        this.error(title, message);
      }
      else if (err.error.warning) {
        const title = err.error.warning.title;
        const message = err.error.warning.message;
        this.warning(title, message);
      }
    }
  }
}
