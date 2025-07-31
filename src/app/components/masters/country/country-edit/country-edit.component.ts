import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Country } from '../country.model';

@Component({
  selector: 'app-country-edit',
  imports: [ReactiveFormsModule, CommonModule, NzButtonModule, NzCardModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss',
})
export class CountryEditComponent {
  countryForm!: FormGroup;
  isEditMode:boolean = false;
  constructor(private fb: FormBuilder, public router: Router, private modalRef: NzModalRef) {
    this.initializeForm();
  }

  ngOnInit(): void {
      console.log(this.modalRef.getConfig().nzData);
    if (this.modalRef.getConfig().nzData?.country){
      this.isEditMode = true;
      this.countryForm.patchValue(this.modalRef.getConfig().nzData.country);
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  initializeForm(){
    this.countryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }
  
  getEditedCountry(): Country {
    return this.countryForm.value;
  }
}
