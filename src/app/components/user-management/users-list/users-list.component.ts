import { Component, OnInit } from '@angular/core';
import { apiService } from '../../../services/apiService';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { latLng, tileLayer, marker, Marker, icon } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    CommonModule,
    LeafletModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(private apiService: apiService) { }

  listOfUsers: any[] = [];
  modalData: any;
  isConfirmLoading = false;

  // Leaflet map options
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng(0, 0)
  };

  markers: Marker[] = [];

  ngOnInit(): void {
    this.getUsers();
    this.fixLeafletAssets();
  }

  // Fix for Leaflet marker icons
  private fixLeafletAssets() {
    // Use public folder for marker icons (served from root)
    const iconRetinaUrl = '/marker-icon-2x-red.png';
    const iconUrl = '/marker-icon-red.png';
    const shadowUrl = '/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
  }

  getUsers() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.listOfUsers = data.body?.content;
    });
  }

  showModal(data: any): void {
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
    if (user?.latitude && user?.longitude) {
      const position = latLng(user.latitude, user.longitude);
      this.options = {
        ...this.options,
        center: position
      };
      this.markers = [
        marker(position, {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            iconUrl: '/marker-icon-red.png',
            shadowUrl: '/marker-shadow.png'
          })
        })
      ];
    }
  }
}