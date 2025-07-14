import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { icons } from './icons-provider';
import { provideAnimations } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ToasterInterceptor } from './interceptors/toaster.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzIcons(icons),
    provideAnimations(),
    provideNzI18n(en_US),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(NzDropDownModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToasterInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },

  ]
};
