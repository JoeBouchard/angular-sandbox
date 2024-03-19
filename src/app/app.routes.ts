import { Routes } from '@angular/router';
import { ZipCodePageComponent } from './zip-code-page/zip-code-page.component';
import { LogsComponent } from './logs/logs.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: 'zipcode', component: ZipCodePageComponent },
  { path: '', component: HomePageComponent },
  { path: 'logs', component: LogsComponent },
];
