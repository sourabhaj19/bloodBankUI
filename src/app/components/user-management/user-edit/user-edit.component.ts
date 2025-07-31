import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ActivatedRoute, Router } from '@angular/router';
import { apiService } from '../../../services/apiService';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule, // Required for formGroup
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzRadioModule,
    NzInputNumberModule,
    NzSwitchModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  userForm! : FormGroup;
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  countries = ['India', 'USA', 'UK', 'Canada'];
  states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu'];
  roles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR'];
  phonePrefixes = ['+91', '+1', '+44', '+61'];
  user : any
  constructor(private fb: FormBuilder, protected activatedRoute: ActivatedRoute, private apiservice : apiService, private router : Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ user }) => {
      user ? this.userForm.patchValue(user.body) :  null;
    }) 
  }
  // Placeholder for any methods or properties needed for user editing functionality
  // For example, you might want to handle form submission or validation here.

  initializeForm(){
      this.userForm = this.fb.group({
        id: [null],
        fullName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        phonePrefix: ['+91', [Validators.required]],
        age: [null, [Validators.required, Validators.min(18), Validators.max(100)]],
        dob: ['', Validators.required],
        gender: ['male', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        countryCode: ['in'],
        city: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(200)]],
        role: ['ROLE_USER', Validators.required],
        bloodGroup: ['', Validators.required],
        latitude: [null, [Validators.min(-90), Validators.max(90)]],
        longitude: [null, [Validators.min(-180), Validators.max(180)]],
        lastDonationDate: [null],
        isAvailable: [true]
      });
  }

  saveUser(){
    if (this.userForm.invalid) {
      console.error('Form is invalid');
      return;
    } 
    if(!this.userForm.value.id){
      this.userForm.value.id = null;
    this.apiservice.register(this.userForm.value).subscribe({
      next: (res:any) => {
        this.router.navigate(['/users']);
        console.log('User saved successfully:', res);
      },
      error: (err:any) => {
        console.error('Error saving user:', err);
      }
    });
  }else{
      this.apiservice.editUser(this.userForm.value).subscribe({
      next: (res:any) => {
        this.router.navigate(['/users']);
        console.log('User updated successfully:', res);
      },
      error: (err:any) => {
        console.error('Error updating user:', err);
      }
    });
  }
  }
  goBack(){
    window.history.back();
  }
}
