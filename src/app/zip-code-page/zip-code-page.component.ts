import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { DisplayComponent } from '../display/display.component';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-zip-code-page',
  standalone: true,
  imports: [SearchComponent, DisplayComponent, LeafletMapComponent],
  template: `<h1>Zip Code Finder</h1>
    <app-leaflet-map></app-leaflet-map>`,
  styles: `h1 {
    text-align: center;
  }`,
})
export class ZipCodePageComponent {}
