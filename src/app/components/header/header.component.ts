// header.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { getFilteredMenu } from './../../menu';
import { AuthService } from '../../services/auth.service';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, NzMenuModule,
    NzBreadCrumbModule, NzIconModule, NzLayoutModule, RouterOutlet, RouterModule
  ],
})
export class HeaderComponent implements OnInit {
  route = inject(Router);
  isCollapsed = true;
  filteredMenuItems: any[] = [];
  isLoggedIn = false;
  username = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userRole$.subscribe((role) => {
      this.filteredMenuItems = getFilteredMenu(role);
      this.isLoggedIn = role !== 'PUBLIC';
      this.username = this.authService.getUsername();
    });
  }

  onLogout() {
    sessionStorage.clear();
    this.authService.logout();
    this.route.navigate(['/']);
  }

  navigateTo(route: string): void {
    this.route.navigate([route]);
    this.isCollapsed = true;
  }
}