import { Component, inject, OnInit } from '@angular/core';
import { apiService } from '../../../services/apiService';
import { NzTableModule} from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import L from 'leaflet';
import { MapViewComponent } from '../../shared/map-view/map-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [NzTableModule, NzButtonModule, NzModalModule, CommonModule, NzModalModule, NzCardModule, NzDropDownModule, FormsModule, NzIconModule, RouterModule],
  providers: [NzModalService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private map!: L.Map;
   modal = inject(NzModalService);
  constructor(private apiService: apiService, private router : Router) {}
  listOfUsers: any[] = [];
  listOfDisplayData: any[] = [];
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }
  getUsers(){
      this.apiService.getUsers().subscribe((data :any) => {
        this.listOfUsers = data.body?.content;
        this.listOfDisplayData = [...this.listOfUsers];

      });
  }


  modalData : any;
  isConfirmLoading = false;

  viewUser(data:any): void {
    this.modalData = data;
  }

  editUser(user?: any): void {
    if(user){
      this.router.navigate(['/users/', user.id]);
    }else{
      this.router.navigate(['/users/new']);
    }
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.modalData = null;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.modalData = null;
  }

  showUserOnMap(user: any | any[]) {
      this.modal.create({
        nzTitle: user?.fullName ? `Location of ${user.fullName}` : 'Search Locations',
        nzContent: MapViewComponent, // Your Leaflet component
        nzData:  {user} , // Pass user data
        nzWidth: 700,
        nzBodyStyle: { padding: '0' }, // Remove padding for full-width map
      });
    }

  delete(data: any) {
    this.modal.confirm({
      nzTitle: 'This action can not be revert!',
      nzContent: `<b style="color: red;">Are you want to sure to delete ${data.fullName}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.apiService.deleteUser(data.id).subscribe({
          next: (res) => {
            console.log('User deleted successfully:', res);
            this.getUsers(); // Refresh the list after deletion
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
  searchValue = '';
  visible = false;

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfUsers.filter((item: any) => item.fullName.indexOf(this.searchValue) !== -1);
  }
  

}
