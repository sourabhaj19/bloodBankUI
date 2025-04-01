import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MENU_ITEMS } from '../../pages.menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems : any[] = MENU_ITEMS;
  currentUser: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('currentUser') || null;
    this.currentUser = JSON.parse(this.currentUser);

  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
