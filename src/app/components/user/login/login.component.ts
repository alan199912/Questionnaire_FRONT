import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isLoader = false;

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

  public async loginUser(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoader = true;

    try {
      const user = await this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .toPromise();

      localStorage.setItem('TOKEN', user.token);

      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.isLoader = false;
      this.toastr.error(error.error.message, 'User login.');
      this.loginForm.reset();
    }
  }
}
