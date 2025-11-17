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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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
  isCollapsed = false;
  filteredMenuItems: any[] = [];
  isLoggedIn = false;
  username = '';
  private smallScreenQuery = '(max-width: 768px)'
  private destroy$ = new Subject<void>()



  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([this.smallScreenQuery])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result.matches) {
          // small screen -> collapse the sider
          this.isCollapsed = true;
        } else {
          // large screen -> expand the sider (or keep previously user-set state)
          this.isCollapsed = false;
        }
      });

   }

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