import { HttpClient } from '@angular/common/http';
import { GET_ALL_USERS, LOGIN, REGISTER, SEARCH_BLOOD_QUERY} from '../utils/apiUrls'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This ensures the service is globally available
})

export class apiService{
  constructor(private http : HttpClient){}

  login(payload :any){
    return this.http.post(LOGIN, payload)
  }
  register(payload :any){
    return this.http.post(REGISTER, payload)
  }

  getLoggedUser(id: number) {
    return this.http.get(GET_ALL_USERS + '/' + id, { observe: 'response' });
  }
  searchBlood(query : any){

    return this.http.post(SEARCH_BLOOD_QUERY, query, {observe : 'response'})
  }

  getUsers(){
    return this.http.get(GET_ALL_USERS, {observe: 'response'})
  }
}