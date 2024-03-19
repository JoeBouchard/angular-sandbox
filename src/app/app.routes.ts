import { Routes } from '@angular/router';
import { ZipCodePageComponent } from './zip-code-page/zip-code-page.component';
import { LogsComponent } from './logs/logs.component';

export const routes: Routes = [
  { path: '', component: ZipCodePageComponent },
  { path: 'logs', component: LogsComponent },
];
