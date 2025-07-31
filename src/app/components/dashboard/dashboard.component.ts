import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-dashboard',
  imports: [NzLayoutModule, NzMenuModule, NzCardModule, NzGridModule,
    NzTagModule, NzListModule, NzAvatarModule, NzButtonModule,
    NzIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  receivedData: any;
  currentUser: any;
  constructor(private router: Router, private apiService : apiService) {}

  ngOnInit() {
    this.getCurrentUser()
  }
  recentDonations = [
    {
      donor: 'John Smith',
      bloodType: 'A+',
      date: 'Today, 10:30 AM',
      status: 'Completed'
    },
    {
      donor: 'Sarah Johnson',
      bloodType: 'B+',
      date: 'Yesterday, 2:15 PM',
      status: 'Completed'
    },
    {
      donor: 'Michael Brown',
      bloodType: 'O+',
      date: 'Yesterday, 11:45 AM',
      status: 'Processing'
    },
    {
      donor: 'Emily Davis',
      bloodType: 'AB+',
      date: '2 days ago',
      status: 'Completed'
    }
  ];

  getCurrentUser() {
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    console.log('User from sessionStorage:', user.user);
    if (user.user) {
      this.apiService.getUserById(user?.user?.id).subscribe({
        next: (res) => {
          console.log('User details from API:', res);
          this.currentUser = res?.body;
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
        }
      });
    }
  }
}
