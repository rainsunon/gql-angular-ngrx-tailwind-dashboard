import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {appState} from '../state/app.reducer';
import {map} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterOutlet, RouterLink],
  template: `

      <div [class.hidden]="sideBarClosed | async" class="dark:bg-gray-600 drop-shadow-md overflow-hidden transition-all
       h-full bg-[rgb(247,248,248)] md:w-[300px] w-screen relative">
        <div class="">
          <div
            class="w-full h-[60px] flex dark:hover:bg-gray-800 dark:border-gray-500 dark:bg-gray-600 bg-[rgba(247,247,247)] text-gray-400 hover:bg-[rgb(240,240,240)]  cursor-pointer transition-all items-center px-5 h border-2">
            Home
          </div>
          <div
            class="w-full h-[60px] flex dark:hover:bg-gray-800 dark:border-gray-500 dark:bg-gray-600 bg-[rgba(247,247,247)] border-t-0 text-gray-400 hover:bg-[rgb(240,240,240)]  cursor-pointer transition-all items-center px-5 h border-2">
            Dashboard
          </div>
          <div [routerLink]="'settings'"
               routerLinkActive="bg-[rgb(240,240,240)] dark:bg-gray-800"
               class="w-full h-[60px] flex dark:hover:bg-gray-800 dark:border-gray-500 dark:bg-gray-600 bg-[rgba(247,247,247)] border-t-0 text-gray-400 hover:bg-[rgb(240,240,240)]  cursor-pointer transition-all items-center px-5 h border-2">
            Settings
          </div>
          <div
            class="w-full h-[60px] dark:hover:bg-gray-800 dark:border-gray-500 flex dark:bg-gray-600 bg-[rgba(247,247,247)] border-t-0  text-gray-400 hover:bg-[rgb(240,240,240)]   cursor-pointer transition-all items-center px-5 h border-2">
            App
          </div>
        </div>
      </div>
      <ng-content></ng-content>
  `,
  styles: []
})
export class SidebarComponent {
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);
  sideBarClosed = this.store.select('app').pipe(map(s => s.sideBarClosed));

}
