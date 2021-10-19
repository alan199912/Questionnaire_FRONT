import { checkPassword } from 'src/app/helpers/checkPassword';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit, OnDestroy {
  public restorePasswordForm: FormGroup;
  public onDestroy$: Subject<void> = new Subject();
  public encodeToken: string;
  public idUser: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly activatedRouter: ActivatedRoute,
    private readonly userService: UserService,
    private readonly toastrService: ToastrService,
    private readonly router: Router
  ) {
    this.restorePasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: checkPassword,
      }
    );
  }

  public ngOnInit(): void {
    this.idUser = atob(this.activatedRouter.snapshot.params.id);
    this.encodeToken = this.activatedRouter.snapshot.params.encodeToken;
  }

  public restorePassword(): void {
    if (this.restorePasswordForm.invalid) {
      return;
    }

    this.userService
      .updatePassword(
        this.idUser,
        this.restorePasswordForm.value.password,
        this.encodeToken
      )
      .pipe(takeUntil(this.onDestroy$.asObservable()))
      .subscribe(
        (message) => {
          this.toastrService.success(message, 'Response');
          this.router.navigate(['/auth/login']);
        },
        (error) => this.toastrService.error(error, 'ERROR')
      );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
