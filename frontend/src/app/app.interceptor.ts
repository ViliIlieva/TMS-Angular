import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './core/error/error.service';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private errorService: ErrorService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiUrl),
        //когато се аутентикираме ще получим cookie
        withCredentials: true,//Cookie -> JWT
      });
    }

    return (
      next
        .handle(req)
        //всички заявки които се интерсептват ще минават през този catchError
        .pipe(
          catchError((err) => {
            //прихващаме първоначалната грешка, че няма ауторизиран юзър
            if (err.status === 401) {
              this.router.navigate(['/']);
            } else {
              this.errorService.setError(err);
              this.router.navigate(['/error']);
            }

            return [err];
          }),
        )
    );
  }
}

export const AppInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};
