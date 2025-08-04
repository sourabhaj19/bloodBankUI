import { Injectable } from "@angular/core";
import { apiService } from "../../services/apiService";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "./user.model";


@Injectable({  providedIn: 'root'})
export class UserResolver implements Resolve<any> {
  constructor(private apiService: apiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const userId : User['id']= Number(route.paramMap.get('id'));
    if (userId){
      return this.apiService.getUserById(userId).pipe(
        catchError((error : any) => {
          console.error('Retrieving user failed', error);
          return of(null);
        }));
    }else{
      return of(null);
    }
  }
}