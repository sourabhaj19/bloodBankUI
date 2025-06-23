import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loadState = this.loadingSubject.asObservable();

  showLoader() {
    this.loadingSubject.next(true);
    console.log('LoaderService: Show loader');
  }

  hideLoader() {
    this.loadingSubject.next(false);
    console.log('LoaderService: Hide loader');
  }
}