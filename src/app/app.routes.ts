import { Routes } from '@angular/router';
import { ZipCodePageComponent } from './zip-code-page/zip-code-page.component';
import { LogsComponent } from './logs/logs.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'zipcode',
    component: ZipCodePageComponent,
    title: 'Zip Code Finder',
  },
  { path: '', component: HomePageComponent, title: "Joe's Angular Sandbox" },
  { path: 'logs', component: LogsComponent, title: 'Local Logs' },
];
