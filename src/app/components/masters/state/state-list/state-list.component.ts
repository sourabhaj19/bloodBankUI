import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { apiService } from '../../../../services/apiService';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router } from '@angular/router';
import { State } from '../state.model';
import { StateEditComponent } from '../state-edit/state-edit.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-state-list',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzCardModule],
  providers: [NzModalService],
  templateUrl: './state-list.component.html',
  styleUrl: './state-list.component.scss'
})
export class StateListComponent {

  apiService = inject(apiService);
  modal = inject(NzModalService);
  route = inject(Router);

  listOfStates: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getStates();
  }

  getStates() {
    this.apiService.getStates().subscribe((data: any) => {
      this.listOfStates = data?.content;
      console.log(this.listOfStates);
    });
  }


  editState(state: State | null = null): void {
          const modalRef = this.modal.create({
            nzTitle: state ? 'Edit State' : 'Add State',
            nzContent: StateEditComponent,
            nzData: {
              state: state || {} // Pass existing country or empty object for new
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
                  const editedCity = modalRef.getContentComponent().getEditedState();
      
                  // Call appropriate API method
                  const apiCall = this.apiService.createState(editedCity);
      
                  apiCall.subscribe({
                    next: (res) => {
                      this.getStates(); // Refresh list
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

        delete(data: State) {
            this.modal.confirm({
              nzTitle: 'This action can not be revert!',
              nzContent: `<b style="color: red;">Are you want to sure to delete State ${data.name}</b>`,
              nzOkText: 'Yes',
              nzOkType: 'primary',
              nzOkDanger: true,
        
              nzOnOk: () => {
                if(data?.id){
                  this.apiService.deleteState(data?.id).subscribe({
            
                    next: (res) => {
                      console.log('State deleted successfully:', res);
                      this.getStates(); // Refresh the list after deletion
                    },          
                    error: (err) => {
                      console.error('Error deleting State:', err);
                    }
                  });
                }
              },
              nzCancelText: 'No',
              nzOnCancel: () => console.log('Cancel')
            });
          }
}
