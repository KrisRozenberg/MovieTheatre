import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newReq = req.clone();

    if (
      this._authService.accessToken &&
      !AuthUtils.isTokenExpired(this._authService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this._authService.accessToken,
        ),
      });
    }

    return next.handle(newReq).pipe(
      catchError(err => this.handleError(err)),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 || error.status === 403) {
        this._authService.signOut();
        location.reload();
      }
      // show alert
      console.log(error);
    }

    return throwError(() => error.error);
  }
};
