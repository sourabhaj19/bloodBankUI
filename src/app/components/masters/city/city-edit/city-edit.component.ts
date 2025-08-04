import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { apiService } from '../../../../services/apiService';
import { Router } from '@angular/router';
import { City } from '../city.model';
import { State } from '../../state/state.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-city-edit',
  imports: [ CommonModule,FormsModule,
      ReactiveFormsModule, // Required for formGroup
      NzFormModule,
      NzInputModule,
      NzSelectModule,
      NzButtonModule,
      NzIconModule],
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.scss'
})
export class CityEditComponent implements OnInit {
  cityForm!: FormGroup;
  statesMaster: State[] = [];
  error = signal<string | null>(null);
  constructor(private fb : FormBuilder, private apiService : apiService, private route : Router,private modalRef: NzModalRef){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeForm();
    this.loadInitialStateData();
  }

  initializeForm() {
    this.cityForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      state: [null, [Validators.required]]
    });
  }


  private loadInitialStateData(): void {
    this.apiService.getStates().subscribe({
      next: (states : any) => {
        this.statesMaster = states?.content;
        if (this.modalRef.getConfig().nzData?.city) {
          this.cityForm.patchValue(this.modalRef.getConfig().nzData.city)
          console.log(this.modalRef.getConfig().nzData.city);
        }
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load states');
      }
    });
  }

  compareStates = (state1: State, state2: State) => {
    return state1 && state2 && state1.id === state2.id;
  }
  goBack() {
    window.history.back();
  }

 
  getEditedCity(): City {
      return this.cityForm.value;
    }

}

