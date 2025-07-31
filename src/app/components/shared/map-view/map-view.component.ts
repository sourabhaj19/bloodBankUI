// map-view.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import L from 'leaflet';

@Component({
  selector: 'app-map-view',
  template: '<div id="map"></div>',
  styles: [`
    #map { height: 400px; width: 100%; border-radius: 8px; }
  `]
})
export class MapViewComponent implements OnInit {
  private map!: L.Map;
  private markers: L.Marker[] = []; // Declare markers array

  constructor(
    @Inject(NzModalRef) private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initMap();

    // Get user data from modal reference
    const user = this.modalRef.getConfig().nzData?.user;
    console.log('User data:', user); // Debug log

    if (user) this.showUserOnMap(user);
  }

  private initMap(): void {
    this.map = L.map('map').setView([16.451078, 74.398695], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  showUserOnMap(users: any | any[]) {
    const usersArray = Array.isArray(users) ? users : [users];
    this.clearMarkers();

    if (usersArray.length === 0) {
      this.map.setView([16.451078, 74.398695], 13);
      return;
    }

    const validUsers = usersArray.filter(user =>
      user?.latitude && user?.longitude
    );

    if (validUsers.length === 0) {
      console.warn('No users with valid coordinates');
      this.map.setView([16.451078, 74.398695], 13);
      return;
    }

    if (validUsers.length === 1) {
      const user = validUsers[0];
      this.map.setView([user.latitude, user.longitude], 15);
      this.addMarker(user);
      return;
    }

    const bounds = L.latLngBounds([]);
    validUsers.forEach(user => {
      this.addMarker(user);
      bounds.extend([user.latitude, user.longitude]);
    });
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }

  private addMarker(user: any) {
    const marker = L.marker([user.latitude, user.longitude]).addTo(this.map);
    marker.bindPopup(`
      <b>${user.fullName}</b><br>
      📍 ${user.address || 'No address'}<br>
      📞 ${user.phone || 'N/A'}
    `);
    this.markers.push(marker);
  }

  private clearMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }
}