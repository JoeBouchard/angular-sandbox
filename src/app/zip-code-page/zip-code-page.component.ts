import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { DisplayComponent } from '../display/display.component';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-zip-code-page',
  standalone: true,
  imports: [SearchComponent, DisplayComponent, LeafletMapComponent],
  templateUrl: './zip-code-page.component.html',
  styleUrl: './zip-code-page.component.css',
})
export class ZipCodePageComponent {}
