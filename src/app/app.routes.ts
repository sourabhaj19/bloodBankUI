import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { FindBloodComponent } from './components/find-blood/find-blood.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsersListComponent } from './components/user-management/users-list/users-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'find-blood', component: FindBloodComponent },
];
