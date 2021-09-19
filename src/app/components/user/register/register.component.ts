import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseData } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

interface VerifyPasswords {
  notSame: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public isLoader = false;

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
        validators: this.checkPassword,
      }
    );
  }

  public async registerUser(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoader = true;

    try {
      const response: ResponseData = await this.authService
        .registerUser(
          this.registerForm.value.email,
          this.registerForm.value.username,
          this.registerForm.value.confirmPassword
        )
        .toPromise();
      this.toastr.success(response.message, 'User register.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.isLoader = false;
      this.toastr.error(error.error.message, 'User register.');
    }
  }

  private checkPassword(group: FormGroup): VerifyPasswords {
    return (
      group.controls.password?.value !==
        group.controls.confirmPassword?.value && { notSame: true }
    );
  }
}
