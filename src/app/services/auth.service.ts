import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string>('PUBLIC');
  userRole$ = this.userRoleSubject.asObservable();

  constructor() {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    this.userRoleSubject.next(user?.user?.role || 'PUBLIC');
  }

  setUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userRoleSubject.next(user?.user?.role || 'PUBLIC');
  }

  logout() {
    sessionStorage.clear();
    this.userRoleSubject.next('PUBLIC');
  }

  isAuthenticated(): boolean {
    // Return true if user is logged in
    return !!localStorage.getItem('authToken');
  }

  getRole(): string | null {
    // Return user role from JWT or session
    return localStorage.getItem('userRole');
  }

  getUsername(): string {
    // Return current username
    return localStorage.getItem('username') || 'User';
  }
}
