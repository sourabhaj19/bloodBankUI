import { HttpClient } from '@angular/common/http';
import { CITY, COUNTRY, GET_ALL_USERS, GET_AVAiLABLE_BLOOD, LOGIN, REGISTER, SEARCH_BLOOD_QUERY, STATE} from '../utils/apiUrls'
import { inject, Injectable } from '@angular/core';
import { createRequestOption } from '../utils/request.util';
import { Country } from '../components/masters/country/country.model';
import { Observable } from 'rxjs';
import { State } from '../components/masters/state/state.model';

@Injectable({
  providedIn: 'root' // This ensures the service is globally available
})

export class apiService{
  private http = inject(HttpClient);
  // constructor(private http : HttpClient){}

  login(payload :any){
    return this.http.post(LOGIN, payload)
  }
  register(payload :any){
    return this.http.post(REGISTER, payload)
  }


  getUserById(id: any) {
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

  editUser(User:any) {
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

  getCities(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(CITY, { params: options, observe: 'response' });
  }

  createCity(payload: any) {
    return this.http.post(CITY, payload, { observe: 'response' });
  }
}