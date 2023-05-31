import { Routes } from '@angular/router';
import {SettingsComponent} from './settings/settings.component';

export const routes: Routes = [
  {path: 'settings', pathMatch: 'full', component: SettingsComponent}
];
