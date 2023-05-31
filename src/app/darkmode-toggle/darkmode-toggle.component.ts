import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Store} from '@ngrx/store';
import {appState} from '../state/app.reducer';
import {map, tap} from 'rxjs';
import {toggleDarkMode} from '../state/app.actions';

@Component({
  selector: 'app-darkmode-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-14 h-8">
      <input type="checkbox" id="dark-mode-toggle" [(ngModel)]="darkMode" class="hidden"
             (change)="darkModeChange()"/>
      <label for="dark-mode-toggle"
             class="transition-all delay-0 w-full h-full bg-[rgb(220,220,220)] dark:bg-slate-600 rounded-full p-1 flex justify-between items-center  cursor-pointer">
                        <span class="inline ml-1 dark:hidden"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                   viewBox="0 0 24 24" stroke-width="1.5"
                                                                   stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
</svg>
</span>
        <span class="w-6 h-6 rounded-full bg-white dark:bg-gray-800 block float-right dark:float-left"></span>
        <span class="hidden ml-1 dark:inline"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                   viewBox="0 0 24 24" stroke-width="1.5"
                                                   stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
</svg>
</span>
      </label>
    </div>
  `,
  styles: []
})
export class DarkmodeToggleComponent implements OnInit {

  isDarkMode = () => document.body.classList.contains('dark');
  store: Store<{ app: typeof appState }> = inject(Store<{ app: typeof appState }>);

  darkMode = false;
  darkModeChange() {
    this.store.dispatch(toggleDarkMode());
  }

  ngOnInit() {
    this.store.select('app').pipe(map(s => s.darkMode), tap(darkMode => {
      this.darkMode = darkMode;
    }))
  }
}
