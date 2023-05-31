import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req2 = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))});
    return next.handle(req2);
    /*return next.handle(req2).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          const user = jwt_decode<UserModel & { exp: number }>(localStorage.getItem('access_token') ?? '');

          if (err.status === 401 || Date.now() >= user.exp * 1000) {
            this.resetLoginState();
          }

          return;
        }
      }));*/
  }


  resetLoginState() {

    localStorage.removeItem('jwt');
    // this.store.dispatch(new SetIsLoggedIn(false));
    // this.store.dispatch(new SetCurrentUser(undefined));
  }
}
