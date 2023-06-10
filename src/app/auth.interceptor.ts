import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {UserGqlModel} from '../sdk/gql';
import {Store} from '@ngrx/store';
import {appState} from './state/app.reducer';
import {logout} from './state/app.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req2 = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt'))});

    return next.handle(req2).pipe(tap((r) => {
      if(!localStorage.getItem('jwt')){
        this.resetLoginState();
        return;
      }

      const user = jwt_decode<UserGqlModel & { exp: number }>(localStorage.getItem('jwt') ?? '');
      if(r instanceof HttpResponse<{body: {errors: any[]}}>){
        if (r?.body?.errors?.[0]?.extensions?.originalError?.statusCode === 401 || Date.now() >= user?.exp * 1000) {
          this.resetLoginState();
        }
      }

    }));
  }


  resetLoginState() {
     this.store.dispatch(logout());
    // this.store.dispatch(new SetCurrentUser(undefined));
  }
}
