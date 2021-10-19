import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnDestroy {
  public recoveryPasswordForm: FormGroup;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService
  ) {
    this.recoveryPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public recoveryPassword(): void {
    if (this.recoveryPasswordForm.invalid) {
      return;
    }

    console.log(this.recoveryPasswordForm.value.email);

    this.authService
      .recoveryPassword(this.recoveryPasswordForm.value.email)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (message) => this.toastrService.success(message, 'Response'),
        (error) => this.toastrService.error(error, 'ERROR')
      );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
