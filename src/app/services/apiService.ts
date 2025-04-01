import { HttpClient } from '@angular/common/http';
import {LOGIN, REGISTER} from '../utils/apiUrls'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This ensures the service is globally available
})

export class apiSevrvice{
  constructor(private http : HttpClient){}

  login(payload :any){
    return this.http.post(LOGIN, payload)
  }
  register(payload :any){
    return this.http.post(REGISTER, payload)
  }
}