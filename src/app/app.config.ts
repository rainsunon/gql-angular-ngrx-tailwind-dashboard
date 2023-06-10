import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from '@ngrx/store';
import {appReducer, appState} from './state/app.reducer';
import {appInit, postLogin} from './state/app.actions';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular'
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AuthInterceptor} from './auth.interceptor';
import {AppEffects} from './state/app.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {catchError, EMPTY, first, map, Observable, of, skipUntil, skipWhile, switchMap, timer} from 'rxjs';
import {GetRefreshToken_QueryGQL, HandleRefreshToken_QueryGQL} from '../sdk/gql';
function waitFor<T>(signal: Observable<any>) {
  return (source: Observable<T>) => signal.pipe(
    map(
      clients => {
        // some skip condition
        if (!clients)
          throw 0 /* default value */;

        return clients;
      }),
    switchMap(_ => source),
  );
}
export function initApplication(store: Store<{ app: typeof appState }>): Function {
  const handleRefresh = inject(HandleRefreshToken_QueryGQL);
  const getRefreshToken = inject(GetRefreshToken_QueryGQL);
  const isLoggedIn = store.select('app').pipe(map(s  => s.isLoggedIn));
  return () => new Promise(resolve => {
    store.dispatch(appInit());
    timer(1000, 5000).pipe(
      switchMap(() => {
        // @ts-ignore
        return getRefreshToken.watch().refetch()
      }), switchMap((d) => {
        // @ts-ignore
        return handleRefresh.watch().refetch({refreshToken: d.data.getRefreshToken})
      })).subscribe((res: any) => {
      store.dispatch(postLogin({
        refreshToken: res.data.handleRefreshToken.refreshToken as any,
        token: res.data.handleRefreshToken.token as any
      }));
    });
    resolve(true);
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({uri: 'graphql'}),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [Store]
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    importProvidersFrom([
      HttpClientModule,
      ApolloModule,
      StoreModule.forRoot({app: appReducer}),
      EffectsModule.forRoot([AppEffects]),
      BrowserAnimationsModule,
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: false})
    ])
  ],
};
