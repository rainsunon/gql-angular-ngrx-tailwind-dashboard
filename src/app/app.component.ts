import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ClickOutsideDirective} from './outside-click-directive';
import {DarkmodeToggleComponent} from './darkmode-toggle/darkmode-toggle.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {Store} from '@ngrx/store';
import {appState} from './state/app.reducer';
import {interval, map, switchMap, timer} from 'rxjs';
import {NavComponent} from './nav/nav.component';
import {
  AllUsers_QueryGQL,
  GetRefreshToken_QueryGQL,
  HandleRefreshToken_QueryGQL,
  Login_QueryGQL,
} from '../sdk/gql';
import {LoginFormComponent} from './login-form/login-form.component';
import {postLogin} from './state/app.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterOutlet,
    ClickOutsideDirective,
    RouterLink,
    RouterLinkActive,
    DarkmodeToggleComponent,
    SidebarComponent,
    NavComponent, LoginFormComponent],
  providers: [],
  template: `
    <app-nav></app-nav>
    <div class="font-mono w-full h-[calc(100vh-60px)] ">
      <div class=" w-full  h-full flex flex-row ">
        <app-sidebar>
        </app-sidebar>
        <div [class.w-[calc(100%-300px)]]="!(sideBarClosed | async)" [class.sm:w-[calc(100%)]]="!(sideBarClosed | async)" [class.w-full]="sideBarClosed | async"
             class="h-full pt-5 px-5 bg-[rgb(248,249,250)] dark:bg-gray-500 text-gray-500 transition-all
         ">
          <app-login-form *ngIf="loginFormOpen | async"></app-login-form>
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>

  `,
  styles: [],
})
export class AppComponent {
  data = inject(AllUsers_QueryGQL);
  login = inject(Login_QueryGQL);
  handleRefresh = inject(HandleRefreshToken_QueryGQL);
  getRefreshToken = inject(GetRefreshToken_QueryGQL);
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);

  sideBarClosed = this.store.select('app')
    .pipe(map(s => s.sideBarClosed));
  loginFormOpen = this.store.select('app')
    .pipe(map(s => s.loginFormOpen));

  profileMenuOpen = this.store.select('app')
    .pipe(map(s => s.profileMenuOpen));
  rt$ = this.store.select('app')
    .pipe(map(s => s.refreshToken));

  darkMode = false;
  isDarkMode = () => document.body.classList.contains('dark');

  constructor() {
    this.data.fetch()
      .pipe(map(d => d.data.allUsers))
      .subscribe(res => console.log(res));

    /*
    timer(1000,5000).pipe(switchMap(()=> {
      return this.getRefreshToken.watch().refetch()
    }),switchMap((d) => {
      return this.handleRefresh.watch().refetch({refreshToken: d.data.getRefreshToken})
    })).subscribe(res => {
      this.store.dispatch(postLogin({
        refreshToken: res.data.handleRefreshToken.refreshToken as any,
        token: res.data.handleRefreshToken.token as any
      }));
    });*/
  }
}
