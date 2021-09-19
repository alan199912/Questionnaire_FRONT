import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  public recoveryPasswordForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.recoveryPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public recoveryPassword(): void {
    if (this.recoveryPasswordForm.invalid) {
      return;
    }

    console.log(this.recoveryPasswordForm.value);
  }
}
