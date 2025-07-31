import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class ToasterInterceptor implements HttpInterceptor {
  constructor(
    private notification: NzNotificationService,
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader(); // Show loader when request starts
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
          this.handleSuccessNotification(req);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleErrorNotification(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hideLoader(); // Hide loader when request completes (success or error)
      })
    );
  }

  private handleSuccessNotification(req: HttpRequest<any>): void {
    if (req.url.includes('api/users/login')) {
      this.notification.success('Login Successful', 'You have successfully logged in');
    } else if (req.method === 'POST') {
      this.notification.success('Created Successfully', 'The resource was successfully created');
    } else if (req.method === 'PUT') {
      this.notification.success('Updated Successfully', 'The resource was successfully updated');
    } else if (req.method === 'DELETE') {
      this.notification.success('Deleted Successfully', 'The resource was successfully deleted');
    }
  }

  private handleErrorNotification(error: HttpErrorResponse): void {
    const message = error?.error?.message || error?.error?.error || 'An unexpected error occurred';
    this.notification.error('Request Failed', message);
  }
}