import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;


  constructor(private route : Router){}
  ngAfterViewInit() {
    // Ensure ViewChild is initialized before usage
  }

  toggleRegister() {
    if (this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  toggleLogin() {
    if (this.container) {
      this.container.nativeElement.classList.remove('active');
    }
  }

  login(){
    this.route.navigate(['/login'])
  }
}
