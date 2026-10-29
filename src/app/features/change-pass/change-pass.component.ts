import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent {
  authService = inject(AuthService);
  successMsg = signal('');
  errMsg = signal('');

  changePassForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required]),

      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: this.confirmPassword },
  );

  submitChangePass() {
    if (this.changePassForm.valid) {
      this.successMsg.set('');
      this.errMsg.set('');
      const formData = this.changePassForm.value;
      console.log(this.changePassForm.value);
      // subscribe Api
      this.authService
        .changePassword({
          password: formData.password,
          newPassword: formData.newPassword,
        })
        .subscribe({
          next: (res: any) => {
            console.log('change password successful:', res);

            localStorage.setItem('socialToken', res.data.token);
            this.successMsg.set(res.message);
            setTimeout(() => {
              this.successMsg.set('');
            }, 2000);
          },
          error: (err: any) => {
            console.error('change password failed:', err);
            this.errMsg.set(err.error.message);
            setTimeout(() => {
              this.errMsg.set('');
            }, 2000);
          },
        });
    } else {
      this.changePassForm.markAllAsTouched();
      console.log('errrrrrrrrr');
    }
  }
  confirmPassword(form: AbstractControl) {
    let newPassword = form.get('newPassword')?.value;
    let rePassword = form.get('rePassword')?.value;

    if (newPassword !== rePassword && form.get('rePassword')?.touched) {
      form.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
}
