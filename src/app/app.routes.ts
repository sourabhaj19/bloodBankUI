import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { FindBloodComponent } from './components/find-blood/find-blood.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UsersListComponent } from './components/user-management/users-list/users-list.component';
import { CountryListComponent } from './components/masters/country/country-list/country-list.component';
import { StateListComponent } from './components/masters/state/state-list/state-list.component';
import { CityListComponent } from './components/masters/city/city-list/city-list.component';
import { UserEditComponent } from './components/user-management/user-edit/user-edit.component';
import { UserResolver } from './components/user-management/user.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users/new',
    component: UserEditComponent,
  },
  {
    path: 'users/:id',
    component: UserEditComponent,
    resolve : { user: UserResolver },
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'find-blood', component: FindBloodComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'states', component: StateListComponent },
  { path: 'cities', component: CityListComponent },
];
