import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { apiService } from '../../../../services/apiService';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CountryEditComponent } from '../country-edit/country-edit.component';
import { Country } from '../country.model';

@Component({
  selector: 'app-country-list',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCardModule],
  providers: [NzModalService],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss'
})
export class CountryListComponent {
  apiService = inject(apiService);
  modal = inject(NzModalService);
  listOfCountries: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCountries();
  }

  getCountries() {
    this.apiService.getCountries().subscribe((data: any) => {
      this.listOfCountries = data.body?.content;
      console.log(this.listOfCountries);
    });
  }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: 'This action can not be revert!',
      nzContent: `<b style="color: red;">Are you want to sure to delete country ${data.name}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.apiService.deleteCountry(data.id).subscribe({
          next: (res) => {
            console.log('Country deleted successfully:', res);
            this.getCountries(); // Refresh the list after deletion
          },
          error: (err) => {
            console.error('Error deleting user:', err);
          }
        });
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  editCountry(country: Country | null = null): void {
    const modalRef = this.modal.create({
      nzTitle: country ? 'Edit Country' : 'Add Country',
      nzContent: CountryEditComponent,
      nzData: {
        country: country || {} // Pass existing country or empty object for new
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
            const editedCountry = modalRef.getContentComponent().getEditedCountry();

            // Call appropriate API method
            const apiCall = country
              ? this.apiService.editCountry(editedCountry)
              : this.apiService.createCountry(editedCountry);

            apiCall.subscribe({
              next: (res) => {
                this.getCountries(); // Refresh list
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
