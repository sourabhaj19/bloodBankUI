import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable(); // Observable for components

  // Call this when user logs in
  login(user: any) {
    sessionStorage.setItem('role', user.role); // Store role
    this.currentUserSubject.next(user); // Notify subscribers
  }

  // Call this when user logs out
  logout() {
    sessionStorage.removeItem('role');
    this.currentUserSubject.next(null); // Notify subscribers
  }

  // Get current role (optional)
  getCurrentRole(): string | null {
    return sessionStorage.getItem('role');
  }
}