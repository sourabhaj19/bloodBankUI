  import { Component, Inject, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { NzButtonModule } from 'ng-zorro-antd/button';
  import { NzFormModule } from 'ng-zorro-antd/form';
  import { NzIconModule } from 'ng-zorro-antd/icon';
  import { NzInputModule } from 'ng-zorro-antd/input';
  import { apiService } from '../../../services/apiService';
  import { NzModalRef } from 'ng-zorro-antd/modal';

  @Component({
    selector: 'app-change-password',
    imports: [NzFormModule, NzInputModule, NzButtonModule, NzIconModule, ReactiveFormsModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
  })
  export class ChangePasswordComponent implements OnInit {

    changePasswordForm !: FormGroup;
    passwordVisible = false;

    constructor(private fb: FormBuilder, private apiService: apiService, @Inject(NzModalRef) private modalRef: NzModalRef) {}
    ngOnInit(): void {
      this.initializeForm();
    
      if (this.modalRef?.getConfig().nzData?.user) {
        this.changePasswordForm.controls.userId.patchValue(this.modalRef.getConfig().nzData.user.id)
        console.log(this.modalRef.getConfig().nzData.user);
      }
    }

    initializeForm(){
      this.changePasswordForm = this.fb.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        userId: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
      console.log('Validating password match', form);
      return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
    }

    changePassword(form:any){
      if (this.changePasswordForm.valid) {
        const payload = {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          userId: form.userId
        };
        this.apiService.changePassword(payload).subscribe({
          next: (response: any) => {
            console.log(response);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      } else {
        console.error('Form is invalid');
      }
    }
  }
