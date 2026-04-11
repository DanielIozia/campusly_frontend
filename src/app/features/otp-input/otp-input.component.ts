import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-otp-input',
  imports: [
    CommonModule,
    NgOtpInputComponent
  ],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true
    }
  ]
})
export class OtpInputComponent {

  @Input() minLength: number = 6;
  @Input() onlyNumbers: boolean = true;

  protected value: string = '';
  protected isDisabled: boolean = false;

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  // Chiamato da ng-otp-input ad ogni digitazione
  onOtpChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  // --- ControlValueAccessor ---

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}
