// login.component.ts
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { Router, RouterModule } from '@angular/router';
import { apiService } from '../../services/apiService';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    NzIconModule,
    RouterModule
  ],
  providers: [
    { provide: NZ_ICONS, useValue: [UserOutline, LockOutline] }
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private apiService = inject(apiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      // In a real app, you would call your authentication API here
      console.log('Login form submitted', this.loginForm.value);
      this.apiService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem('user', JSON.stringify(res));
          this.authService.setUser(res); // Pass the actual response object
          this.router.navigate(['/dashboard']);  
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}