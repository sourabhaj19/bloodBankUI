import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  console.log("LoaderInterceptor: Request started");
  loaderService.showLoader();

  return next(req).pipe(
    finalize(() => {
      console.log("LoaderInterceptor: Request completed");
      loaderService.hideLoader();
    })
  );
};