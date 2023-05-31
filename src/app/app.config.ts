import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from '@ngrx/store';
import {appReducer, appState} from './state/app.reducer';
import {appInit} from './state/app.actions';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular'
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AuthInterceptor} from './auth.interceptor';
import {AppEffects} from './state/app.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export function initApplication(store: Store<{ app: typeof appState }>): Function {
  return () => new Promise(resolve => {
    store.dispatch(appInit());
    resolve(true);
  })
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({ uri: 'graphql' }),
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
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
    ])
  ],
};
