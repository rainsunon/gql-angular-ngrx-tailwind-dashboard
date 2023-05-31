import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DarkmodeToggleComponent} from '../darkmode-toggle/darkmode-toggle.component';
import {toggleSidebar, toggleProfileMenu, closeProfileMenu} from '../state/app.actions';
import {Store} from '@ngrx/store';
import {appState} from '../state/app.reducer';
import {map} from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, DarkmodeToggleComponent],
  template: `
    <div
      class="z-50 font-mono w-full dark:bg-gray-700 dark:text-white  text-gray-700 px-5 flex drop-shadow-xl shadow-red-500 items-center relative justify-between bg-[rgb(250,251,252)] h-[60px]">
      <div *ngIf="isLoggedIn | async" [class.opacity-0]="sideBarClosed | async"
           class="transition-all duration-400 flex justify-center items-center">
        <p [class.hidden]="sideBarClosed | async">Logo</p>
      </div>
      <div *ngIf="!(isLoggedIn | async )"
           class="transition-all duration-400 flex justify-center items-center">
        <p>Logo</p>
      </div>

      <div [class.rotate-180]="!(sideBarClosed | async)" *ngIf="isLoggedIn | async" (click)="toggleSideBar()"
           [class.left-[270px]]="!(sideBarClosed | async)" class="cursor-pointer
       hover:scale-110 transition-all duration-400
        absolute">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>

      </div>

      <div class="grid grid-cols-2 gap-5 items-center">
        <app-darkmode-toggle></app-darkmode-toggle>

        <div *ngIf="isLoggedIn | async" (clickOutside)="closeProfileMenu()" class="cursor-pointer relative">
          <img (click)="toggleProfileMenu()" alt="" id="dropdownDefaultButton"
               class="h-10 w-10 rounded-full"
               src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"/>
          <div *ngIf="profileMenuOpen | async" id="dropdown"
               class="z-10 absolute right-0 mt-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <a href="#"
                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{username | async}}</a>
              </li>
              <li>
                <a href="#"
                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#"
                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#"
                   class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                  out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class NavComponent {
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);

  sideBarClosed = this.store.select('app')
    .pipe(map(s => s.sideBarClosed));

  profileMenuOpen = this.store.select('app')
    .pipe(map(s => s.profileMenuOpen));
  username = this.store.select('app')
    .pipe(map(s => s.user?.username));

  isLoggedIn = this.store.select('app')
    .pipe(map(s => s.isLoggedIn && s.user));

  toggleSideBar() {
    this.store.dispatch(toggleSidebar());
  }

  toggleProfileMenu() {
    this.store.dispatch(toggleProfileMenu());
  }
  closeProfileMenu() {
    this.store.dispatch(closeProfileMenu());
  }
}
