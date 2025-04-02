import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { apiSevrvice } from '../../services/apiService';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports : [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {
  @ViewChild('container') container!: ElementRef;

  loginForm!: FormGroup; // Ensure correct initialization
  registrationForm!: FormGroup; // Ensure correct initialization

  constructor(private route: Router, private fb: FormBuilder, private apiservice : apiSevrvice, private authService: AuthService) {}

  ngOnInit() {
    this.getLocation()
    // Using FormBuilder for cleaner form initialization
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      bloodGroup: ['',Validators.required],
      location: ['',Validators.required],
      role: ['',Validators.required],
      isAvailable: [true,Validators.required],
      latitude: ['',Validators.required],
      longitude: ['',Validators.required]
    })

  }

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

  login() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.apiservice.login(this.loginForm.value).subscribe({
        next : (res:any)=>{
          this.authService.login({ role: 'ROLE_ADMIN' }); 
          console.log(res)
          sessionStorage.setItem('currentUser', JSON.stringify(res));
          sessionStorage.setItem('token', res.token)
          this.route.navigate(['/dashboard'], { state: { data: res } });
        },
        error: (err) => {

        }
      })
      console.log('Login successful', this.loginForm.value);
    } else {
      console.log('Invalid login form');
    }
  }

  Register(){
    console.log(this.registrationForm.value)
    if (this.registrationForm.valid) {
      this.apiservice.register(this.registrationForm.value).subscribe({
        next(value) {
          console.log(value)
        },
      })
      console.log('Login successful', this.registrationForm.value);
    } else {
      console.log('Invalid login form');
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.registrationForm.controls['latitude'].setValue(position.coords.latitude)
        this.registrationForm.controls['longitude'].setValue(position.coords.longitude);
      }, (error) => {
          console.log(error)
          // Handle error, e.g. display an error message
        });
    } else {
      // Handle the case where geolocation is not supported
    }
  }
}