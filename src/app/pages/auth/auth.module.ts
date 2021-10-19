import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SharedModule } from '../../shared/shared.module';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    VerifyEmailComponent,
    RestorePasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
