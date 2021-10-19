import { takeUntil, catchError } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public loginForm: FormGroup;
  public isLoader = false;
  public onDestroy$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoader = true;

    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (user) => {
          localStorage.setItem('TOKEN', user.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.isLoader = false;
          this.toastr.error(error, 'User login.');
          this.loginForm.reset();
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
