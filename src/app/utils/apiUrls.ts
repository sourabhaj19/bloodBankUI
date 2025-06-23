import { environment } from '../../environments/environment';

export const LOGIN = `${environment.apiUrl}users/login`
export const REGISTER = `${environment.apiUrl}users/register`
export const GET_ALL_USERS = `${environment.apiUrl}users`
export const SEARCH_BLOOD_QUERY = `${environment.apiUrl}users/users-by-query`