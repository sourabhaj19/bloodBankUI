import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Log the start of the request

  this.loaderService.showLoader();

  return next.handle(req).pipe(
    finalize(() => {
      this.loaderService.hideLoader();
    })
  );
};

}
