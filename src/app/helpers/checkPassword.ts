import { FormGroup } from '@angular/forms';

interface VerifyPasswords {
  notSame: boolean;
}

export function checkPassword(group: FormGroup): VerifyPasswords {
  return (
    group.controls.password?.value !==
      group.controls.confirmPassword?.value && { notSame: true }
  );
}
