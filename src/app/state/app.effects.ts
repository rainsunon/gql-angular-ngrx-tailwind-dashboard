import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, Observable, pluck, switchMap, tap} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {GetRefreshToken_QueryGQL, HandleRefreshToken_QueryGQL, Login_QueryGQL} from '../../sdk/gql';
import {handleRefreshToken, login, postLogin} from './app.actions';

@Injectable()
export class AppEffects {
  loginGql = inject(Login_QueryGQL);
  handleRefresh = inject(HandleRefreshToken_QueryGQL);
  getRefreshToken = inject(GetRefreshToken_QueryGQL);
  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(login.type),
      mergeMap((action) => {
        return this.loginGql.fetch({...(action as any)})
          .pipe(
            map(({data}) => {
              return (postLogin({token: data.login, reload: true}));
            }),
            catchError(() => EMPTY)
          )
      })
    ),
    {dispatch: true}
    // FeatureActions.actionOne is not dispatched
  );



  constructor(
    private actions$: Actions,
  ) {
  }
}
