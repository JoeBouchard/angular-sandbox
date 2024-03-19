import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { DisplayComponent } from './display/display.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { ZipCodePageComponent } from './zip-code-page/zip-code-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogsComponent,
    HttpClientModule,
    ZipCodePageComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sandbox';

  constructor() {}
}
