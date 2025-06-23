import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Your interceptor logic here
  const userString = sessionStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if (user?.token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};