import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { apiService } from '../../../../services/apiService';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router } from '@angular/router';
import { City } from '../city.model';
import { CityEditComponent } from '../city-edit/city-edit.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-city-list',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCardModule],
  providers: [NzModalService],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent {
apiService = inject(apiService);
route = inject(Router);
  modal = inject(NzModalService);
  listOfCities: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getcities();
  }

  getcities() {
    this.apiService.getCities().subscribe((data: any) => {
      this.listOfCities = data.body?.content;
      console.log(this.listOfCities);
    });
  }


  editCity(city: City | null = null): void {
        const modalRef = this.modal.create({
          nzTitle: city ? 'Edit City' : 'Add City',
          nzContent: CityEditComponent,
          nzData: {
            city: city || {} // Pass existing country or empty object for new
          },
          nzFooter: [
            {
              label: 'Cancel',
              onClick: () => modalRef.destroy()
            },
            {
              label: 'Save',
              type: 'primary',
              onClick: () => {
                const editedCity = modalRef.getContentComponent().getEditedCity();
    
                // Call appropriate API method
                const apiCall = this.apiService.createCity(editedCity);
    
                apiCall.subscribe({
                  next: (res) => {
                    this.getcities(); // Refresh list
                    modalRef.destroy();
                  },
                  error: (err) => {
                    console.error(err);
                  }
                });
    
                // Prevent modal from closing automatically
                return false;
              }
            }
          ]
        });
      }
}
