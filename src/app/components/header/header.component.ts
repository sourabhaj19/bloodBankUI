import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MENU_ITEMS } from '../../pages.menu';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuItems: any[] = MENU_ITEMS;
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Initialize with current user from session
    const user = sessionStorage.getItem('currentUser');
    this.currentUser = user ? JSON.parse(user) : null;
  }

  logout() {
    this.authService.logout(); // Use AuthService for logout
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}