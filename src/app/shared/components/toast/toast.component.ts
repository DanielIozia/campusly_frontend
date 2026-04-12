import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Toast, ToasterService } from '../../../core/services/toaster.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  imports: [
    MatIconModule
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  private readonly toastService = inject(ToasterService);

  readonly toasts = this.toastService.toasts;

  readonly icons: Record<Toast['type'], string> = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
  };

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
