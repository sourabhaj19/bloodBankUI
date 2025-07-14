import { HttpClient } from '@angular/common/http';
import { GET_ALL_USERS, LOGIN, REGISTER, SEARCH_BLOOD_QUERY} from '../utils/apiUrls'
import { inject, Injectable } from '@angular/core';
import { createRequestOption } from '../utils/request.util';

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


  getLoggedUser(id: number) {
    return this.http.get(GET_ALL_USERS + '/' + id, { observe: 'response' });
  }
  searchBlood(query : any){
    return this.http.post(SEARCH_BLOOD_QUERY, query, {observe : 'response'})
  }

  getUsers(queryParams?: any) {
    const options = createRequestOption(queryParams);
    return this.http.get(GET_ALL_USERS, { params: options, observe: 'response' })
  }
}