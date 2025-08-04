import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { apiService } from '../../../../services/apiService';
import { Country } from '../../country/country.model';
import { State } from '../state.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-state-edit',
  imports: [CommonModule,FormsModule,
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
  templateUrl: './state-edit.component.html',
  styleUrl: './state-edit.component.scss'
})
export class StateEditComponent {
  stateForm!: FormGroup;
  countryMaster: Country[] = [];
  error = signal<string | null>(null);
  constructor(private fb : FormBuilder, private apiService : apiService,private modalRef: NzModalRef){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeForm();
    this.loadInitialStateData();
  }

  initializeForm() {
    this.stateForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      country: [null, [Validators.required]]
    });
  }


  private loadInitialStateData(): void {
    this.apiService.getCountries().subscribe({
      next: (countries : any) => {
        this.countryMaster = countries?.body?.content;
        if (this.modalRef.getConfig().nzData?.state) {
          this.stateForm.patchValue(this.modalRef.getConfig().nzData.state)
          console.log(this.modalRef.getConfig().nzData.state);
        }
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load states');
      }
    });
  }

 getEditedState(): State {
        return this.stateForm.value;
      }

  compareCountries = (country1: Country, country2: Country) => {
    return country1 && country2 && country1.id === country2.id;
  }
  
}
