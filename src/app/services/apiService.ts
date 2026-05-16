import { HttpClient } from '@angular/common/http';
import { CHANGEPASSWORD, CITY, COUNTRY, GET_ALL_USERS, GET_AVAiLABLE_BLOOD, GETOTP, LOGIN, REGISTER, SEARCH_BLOOD_QUERY, STATE} from '../utils/apiUrls'
import { inject, Injectable } from '@angular/core';
import { createRequestOption } from '../utils/request.util';
import { Country } from '../components/masters/country/country.model';
import { Observable, of } from 'rxjs';
import { State } from '../components/masters/state/state.model';
import { User } from '../components/user-management/user.model';
import { City } from '../components/masters/city/city.model';

@Injectable({
  providedIn: 'root' // This ensures the service is globally available
})

export class apiService{
  private http = inject(HttpClient);
  // constructor(private http : HttpClient){}

  login(payload :any){
    return this.http.post(LOGIN, payload)
  }
  register(payload: User){
    return this.http.post(REGISTER, payload)
  }


  getUserById(id: number) {
    return this.http.get(GET_ALL_USERS + '/' + id, { observe: 'response' });
  }
  searchBlood(query : any){
    return this.http.post(SEARCH_BLOOD_QUERY, query, {observe : 'response'})
  }

  getUsers(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(GET_ALL_USERS, { params: options, observe: 'response' })
  }

  getAvailableBlood() {
    return this.http.get(GET_AVAiLABLE_BLOOD, { observe: 'response' })
  }


  getAvailableCountries(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(COUNTRY, { params: options, observe: 'response' })
  }

  // getCurrentUser(){
  //   return this.http.get(GET_ALL_USERS + '/current', { observe: 'response' });
  // }

 getCurrentUser(): Observable<any> {
    const dummyUser = {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phonePrefix: '+91',
      phone: '9876543210',
      role: 'ROLE_USER',
      latitude: 12.9716,
      longitude: 77.5946,
      lastDonationDate: '2025-06-01'
    };
    return of(dummyUser);
  }

  getRecentDonations(): Observable<any[]> {
    const dummy = [
      { donor: 'Alice Smith', bloodType: 'A+', date: '2025-11-10', status: 'Completed' },
      { donor: 'Bob Johnson', bloodType: 'O-', date: '2025-11-08', status: 'Completed' }
    ];
    return of(dummy);
  }

  getUpcomingDrives(): Observable<any[]> {
    const dummy = [
      { id: 1, title: 'City Hospital Drive', date: '2025-12-01', location: 'City Hospital' },
      { id: 2, title: 'Community Center Drive', date: '2025-12-15', location: 'Community Center' }
    ];
    return of(dummy);
  }

  getRequestsHelpedCount(): Observable<number> {
    return of(5);
  }

  getNearbyDonors(location: any): Observable<any[]> {
    const dummy = [
      { id: 101, fullName: 'Ravi Kumar', bloodGroup: 'B+', distance: '1.2 km', phonePrefix: '+91', phone: '9000000001', latitude: 12.9720, longitude: 77.5950 },
      { id: 102, fullName: 'Sita Patel', bloodGroup: 'O+', distance: '2.4 km', phonePrefix: '+91', phone: '9000000002', latitude: 12.9700, longitude: 77.5930 }
    ];
    return of(dummy);
  }

  getMyDonations(): Observable<any[]> {
    const dummy = [
      { id: 201, bloodType: 'A+', date: '2024-06-10', status: 'Completed' },
      { id: 202, bloodType: 'A+', date: '2023-12-05', status: 'Completed' }
    ];
    return of(dummy);
  }
  getAvailableStates(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(STATE, { params: options ,observe: 'response' });
  }

  getAvailableCities(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(CITY, { params: options, observe: 'response' });
  }

  deleteUser(id:number){
    return this.http.delete(GET_ALL_USERS + '/' + id, { observe: 'response' });
  }

  createCountry(payload: Country) {
    return this.http.post(COUNTRY, payload, { observe: 'response' });
  }

  deleteCountry(id: number) {
    return this.http.delete(COUNTRY + '/' + id, { observe: 'response' });
  }
  editCountry(payload : Country) {
    return this.http.put(COUNTRY , payload, { observe: 'response' });
  }

  editUser(User:User) {
    return this.http.put(GET_ALL_USERS, User ,{ observe: 'response' });
  }

  getCountries(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(COUNTRY, { params: options, observe: 'response' });
  }

  getStates(queryParams?: any): Observable<State[]> {
    const options = createRequestOption(queryParams);
    return this.http.get<State[]>(STATE, { params: options }); // Remove observe: 'response'
  }

  createState(payload: State) {
    return this.http.post(STATE, payload, { observe: 'response' });
  }

  deleteState(id: number) {
    return this.http.delete(STATE + '/' + id, { observe: 'response' });
  }

  getCities(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(CITY, { params: options, observe: 'response' });
  }

  createCity(payload: City) {
    return this.http.post(CITY, payload, { observe: 'response' });
  }

  deleteCity(id: number) {
    return this.http.delete(CITY + '/' + id, { observe: 'response' });
  }

  changePassword(payload: any) {
    return this.http.post(CHANGEPASSWORD, payload, { observe: 'response' });
  }

  getOtp(email: string) {
    return this.http.post(`${GETOTP}`, {email} , { observe: 'response' });
  }
}