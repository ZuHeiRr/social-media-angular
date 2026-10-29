import { AuthService } from './../../core/auth/services/auth/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);
  private readonly Fb = inject(FormBuilder);
  errorMessage: WritableSignal<string> = signal('');

  loginForm: FormGroup = this.Fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    },
    { updateOn: 'submit' },
  );

  submitLogin() {
    if (this.loginForm.valid) {
      this.errorMessage.set('');
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('socialToken', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          setTimeout(() => {
            this.router.navigate(['/feed']);
          }, 1000);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage.set(err.error.message);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  showPassword(inputElement: any) {
    if (inputElement.type == 'password') {
      inputElement.type = 'text';
    } else {
      inputElement.type = 'password';
    }
  }
}
