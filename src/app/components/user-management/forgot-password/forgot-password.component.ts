import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { apiService } from '../../../services/apiService';
import { NzFlexDirective } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-forgot-password',
  imports: [NzCardModule, NzButtonModule, CommonModule, NzFormModule, FormsModule, NzInputModule, NzFlexDirective],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  sentOtp:boolean = true;
  email:string='';
  sendOTP:boolean = false;
  constructor(private apiService: apiService) {}

  getOtp(){
    console.log("Forgot Password Email: ", this.email);
    this.apiService.getOtp(this.email).subscribe({
      next: (res: any) => {
        console.log('OTP sent successfully', res);
        this.sendOTP = true;
        this.sentOtp = false;
      },
      error: (err: any) => {
        console.error('Error sending OTP', err);
      }  
    });
  }

  submitOtp(){

  }
}
