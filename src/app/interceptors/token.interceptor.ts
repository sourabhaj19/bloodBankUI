import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user?.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
