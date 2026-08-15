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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  standalone: true,
  imports: [
    CommonModule, NzMenuModule, NzDrawerModule,
    NzBreadCrumbModule, NzIconModule, NzLayoutModule, RouterOutlet, RouterModule
  ],
})
export class HeaderComponent implements OnInit {
  route = inject(Router);
  filteredMenuItems: any[] = [];
  isLoggedIn = false;
  username = '';
  drawerVisible = false;

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
  }
}