import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { apiService } from '../../services/apiService';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-dashboard',
  imports: [NzLayoutModule, NzMenuModule, NzCardModule, NzGridModule,
    NzTagModule, NzListModule, NzAvatarModule, NzButtonModule,
    NzIconModule, NzTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  private api = inject(apiService);
  private router = inject(Router);
  private msg = inject(NzMessageService);

  currentUser: any = null;
  recentDonations: any[] = [];
  myDonations: any[] = [];
  nearbyDonors: any[] = [];
  upcomingDrives: any[] = [];
  requestsHelpedCount: number = 0;
  loading = {
    recent: false,
    my: false,
    nearby: false,
    drives: false
  };

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadDashboardData();
    this.tryAutoFetchNearby();
  }

  // Load user from api service or fallback to localStorage token payload
  private loadCurrentUser() {
    try {
      // prefer api call if available
      if (this.api.getCurrentUser) {
        this.api.getCurrentUser().subscribe({
          next: (u: any) => (this.currentUser = u),
          error: () => (this.currentUser = this.getUserFromStorage())
        });
      } else {
        this.currentUser = this.getUserFromStorage();
      }
    } catch {
      this.currentUser = this.getUserFromStorage();
    }
  }


  
  private getUserFromStorage() {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private loadDashboardData() {
    this.loadRecentDonations();
    this.loadMyDonations();
    this.loadUpcomingDrives();
    this.loadRequestsHelpedCount();
  }

  private loadRecentDonations() {
    if (!this.api.getRecentDonations) return;
    this.loading.recent = true;
    this.api.getRecentDonations().subscribe({
       next: (data: any) => {
       this.recentDonations = data || [];
      },
      error: () => {
        this.recentDonations = []
      },
      complete: () => (this.loading.recent = false)
    });
  }

  private loadMyDonations() {
    if (!this.api.getMyDonations) return;
    this.loading.my = true;
    this.api.getMyDonations().subscribe({
      next: (res: any) => {
        this.myDonations = res || []},
      error: () => {(this.myDonations = [])},
      complete: () => {(this.loading.my = false)}
    });
  }

  private loadUpcomingDrives() {
    if (!this.api.getUpcomingDrives) return;
    this.loading.drives = true;
    this.api.getUpcomingDrives().subscribe({
      next: (res: any) => (this.upcomingDrives = res || []),
      error: () => (this.upcomingDrives = []),
      complete: () => (this.loading.drives = false)
    });
  }

  private loadRequestsHelpedCount() {
    if (!this.api.getRequestsHelpedCount) return;
    this.api.getRequestsHelpedCount().subscribe({
      next: (n: any) => (this.requestsHelpedCount = n || 0),
      error: () => (this.requestsHelpedCount = 0)
    });
  }

  // Try to fetch nearby donors either using currentUser coords or asking for geolocation permission
  private tryAutoFetchNearby() {
    if (!this.api.getNearbyDonors) return;

    const fetch = (lat?: number, lon?: number) => {
      this.loading.nearby = true;
      this.api.getNearbyDonors({ lat, lon }).subscribe({
        next: (res: any) => (this.nearbyDonors = res || []),
        error: () => (this.nearbyDonors = []),
        complete: () => (this.loading.nearby = false)
      });
    };

    const lat = this.currentUser?.latitude;
    const lon = this.currentUser?.longitude;

    if (lat && lon) {
      fetch(lat, lon);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetch(pos.coords.latitude, pos.coords.longitude),
        () => fetch() // fallback: server can use IP lookup or return default nearby list
      );
    } else {
      fetch();
    }
  }

  // Actions wired to the template ------------------------------------------------

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  showNearbyOnMap() {
    // navigate to map route with donors as state if supported
    if ((this.router as any).navigateByUrl) {
      const params = {
        donors: JSON.stringify(this.nearbyDonors || [])
      };
      // Attempt to navigate with state; fallback to map page
      try {
        this.router.navigate(['/map'], { state: params });
      } catch {
        this.msg.info('Opening map view');
        this.router.navigate(['/map']);
      }
    }
  }

  showUserOnMap(userOrList: any) {
    // If list passed -> open map page with list; if single user -> open Google Maps using coords
    if (Array.isArray(userOrList)) {
      this.router.navigate(['/map'], { state: { donors: JSON.stringify(userOrList) } });
      return;
    }
    const user = userOrList;
    const lat = user?.latitude;
    const lon = user?.longitude;
    if (lat && lon) {
      const url = `https://www.google.com/maps?q=${lat},${lon}`;
      window.open(url, '_blank');
    } else {
      this.msg.warning('Location for this user is not available.');
    }
  }

  contactDonor(donor: any) {
    const phone = `${donor?.phonePrefix || ''}${donor?.phone || ''}`.replace(/\s+/g, '');
    if (phone) {
      // prefer tel: link
      window.open(`tel:${phone}`, '_self');
    } else if (donor?.email) {
      window.open(`mailto:${donor.email}`, '_blank');
    } else {
      this.msg.info('No contact information available for this donor.');
    }
  }

  openRequestModal() {
    // navigate to request create page or open a modal via api/service
    this.router.navigate(['/request/create']);
  }

  shareProfile() {
    const shareUrl = `${location.origin}/profile/${this.currentUser?.id || ''}`;
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'My donor profile',
        text: `${this.currentUser?.fullName} — donor profile`,
        url: shareUrl
      }).catch(() => this.copyToClipboard(shareUrl));
    } else {
      this.copyToClipboard(shareUrl);
    }
  }

  private copyToClipboard(text: string) {
    navigator.clipboard?.writeText(text).then(
      () => this.msg.success('Profile link copied to clipboard'),
      () => this.msg.error('Failed to copy link')
    );
  }

  becomeDonor() {
    // route to registration/edit form prefilled
    this.router.navigate(['/registration'], { state: { prefill: this.currentUser } });
  }

  viewDrive(drive: any) {
    if (!drive) return;
    this.router.navigate(['/drives', drive?.id || '']);
  }
}
