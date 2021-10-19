import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseData } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { checkPassword } from 'src/app/helpers/checkPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  public registerForm: FormGroup;
  public isLoader = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: checkPassword,
      }
    );
  }

  public registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoader = true;

    this.authService
      .registerUser(
        this.registerForm.value.email,
        this.registerForm.value.username,
        this.registerForm.value.confirmPassword
      )
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (response: ResponseData) => {
          this.toastr.success(response.message, 'User register.');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.isLoader = false;
          this.toastr.error(error, 'User register.');
        }
      );
  }

  // private checkPassword(group: FormGroup): VerifyPasswords {
  //   return (
  //     group.controls.password?.value !==
  //       group.controls.confirmPassword?.value && { notSame: true }
  //   );
  // }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
