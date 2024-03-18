import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { DisplayComponent } from './display/display.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LogsComponent,
    HttpClientModule,
    SearchComponent,
    DisplayComponent,
    LeafletMapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sandbox';

  constructor() {}
}
