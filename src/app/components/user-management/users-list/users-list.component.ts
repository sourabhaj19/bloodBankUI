import { Component, OnInit } from '@angular/core';
import { apiService } from '../../../services/apiService';
import { NzTableModule} from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import L from 'leaflet';

@Component({
  selector: 'app-users-list',
  imports: [NzTableModule, NzButtonModule, NzModalModule, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private map!: L.Map;
  constructor(private apiService: apiService) {}
  listOfUsers: any[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
  }
  getUsers(){
      this.apiService.getUsers().subscribe((data :any) => {
        this.listOfUsers = data.body?.content;
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([16.451078, 74.398695], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);
  }

  modalData : any;
  isConfirmLoading = false;

  showModal(data:any): void {
    this.modalData = data;
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

  showUserOnMap(user: any) {
    console.log('Show user on map:', user);
    this.map.setView([user.latitude, user.longitude], 13);
    const marker =L.marker([user.latitude, user.longitude]).addTo(this.map)
    marker.bindPopup(`Name: ${user.fullName}<br>Gender: ${user.gender}<br>Phone: ${user.phoneprefix}-${user.phone}`).openPopup();
  }
}
