import { Injectable } from "@angular/core";
import {  CanActivate,Router } from "@angular/router";

@Injectable({
  providedIn : 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router : Router){}

  canActivate(){
    const isLoggedIn = !sessionStorage.getItem('token');
    if(!isLoggedIn){
      this.router.navigate(['/dashboard']); 
      return false;
    }else{
      return true;
    }
  }
}