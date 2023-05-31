import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card [title]="'User Settings'">
      <div class="mt-2 ml-2 grid grid-cols-2 gap-2">
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">First name</label>
          <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
        <div>
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Last name</label>
          <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
        </div>
      </div>
    </app-card>
  `,
  styles: [
  ]
})
export class SettingsComponent {

}
