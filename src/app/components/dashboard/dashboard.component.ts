import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  receivedData: any;
  currentUser: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser')
    this.currentUser = JSON.parse(this.currentUser);
    const navigation = this.router.getCurrentNavigation();
    this.receivedData = navigation?.extras.state?.['data'] || null;
    console.log('Received Data:', this.receivedData);
    
  }


}
