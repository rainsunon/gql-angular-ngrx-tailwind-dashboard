import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-[10px] flex flex-col  dark:bg-gray-600 dark:text-gray-50 min-h-[250px] p-5 drop-shadow-md">
      <p>{{title}}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
  ]
})
export class CardComponent {
  @Input() title: string = '';
}
