import {Component, DestroyRef, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {appState} from '../state/app.reducer';
import {Login_QueryGQL, Login_QueryQueryVariables} from '../../sdk/gql';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {login, postLogin} from '../state/app.actions';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div
      class="left-0 top-0 w-full absolute flex flex-row h-screen justify-center items-center dark:bg-gray-500 dark:text-white  text-gray-700 px-5 z-10 drop-shadow-xl shadow-red-500  bg-[rgb(250,251,252)]">
      <app-card
        [formGroup]="form"
        class="min-w-[50%] min-h-[50%] flex items-center justify-center bg-white rounded-[10px] dark:bg-gray-600 dark:text-gray-50 p-5 drop-shadow-md">
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input formControlName="username" type="text" id="username"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Username">
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input formControlName="password" type="password" id="password"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Password">
          </div>
          <div></div>
          <button (click)="login()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </div>

      </app-card>
    </div>
  `,
  styles: [
    `
    `
  ]
})
export class LoginFormComponent {
  destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  form = this.fb.group({
    username: 'xsip',
    password: '988798',
  })
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);
  loginGql = inject(Login_QueryGQL);

  login() {
    /*this.loginGql.fetch({...this.form.value} as Login_QueryQueryVariables).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      res => {
        this.store.dispatch(postLogin({token: res.data.login}));
      }
    )*/
    this.store.dispatch(login(this.form.value as any));
  }
}
