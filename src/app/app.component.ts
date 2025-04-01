import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './pages.menu';
import { MenuService } from './services/menuService';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  menu: any[] = [];
  userRoleForMenu: string = '';

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // Subscribe to auth changes
    this.menuService.currentUser$.subscribe(() => {
      this.updateMenu();
    });
    this.updateMenu(); // Initial load
  }

  updateMenu() {
    const role = this.menuService.getCurrentRole();
    this.menu = this.getMenuCopy(); // Deep copy

    // Role display mapping
    const roleMapping: Record<string, string> = {
      'ROLE_ADMIN': 'Administrator',
      'ROLE_BRANCH_USER': 'BRANCH USER',
      // Add other roles as needed
    };

    if (role && roleMapping[role]) {
      this.userRoleForMenu = roleMapping[role];
      this.menu[0].title = `ROLE: ${this.userRoleForMenu}`;
      this.menu = this.filterByRole(this.menu, role);
    }
  }

  getMenuCopy(): any[] {
    return JSON.parse(JSON.stringify(MENU_ITEMS)); // Deep clone
  }

  filterByRole(menuItems: any[], role: string): any[] {
    return menuItems.filter(item => {
      // Include item if no role restriction or role matches
      const roleAllowed = !item.role || item.role.includes(role);
      if (roleAllowed && item.children) {
        item.children = item.children.filter((child: any) => 
          !child.role || child.role.includes(role)
        );
      }
      return roleAllowed;
    });
  }
}