import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { ZipData, ZipFetcherService } from '../../services/zip-fetcher.service';
import { LeafletMapSearchComponent } from '../leaflet-map-search/leaflet-map-search.component';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [LeafletMapSearchComponent],
  template: `<div class="map-container">
      <div class="map-frame">
        <div id="map"></div>
      </div>
    </div>
    <app-leaflet-map-search [map]="map" id="custom-search-component">
    </app-leaflet-map-search> `,
  styles: `.map-frame {
    border: 2px solid black;
    height: 100%;
    min-height: 75vh;
    margin: 0 16px;
    border-radius: 8px;
  }
  #map {
    height: 100%;
    min-height: 75vh;
    border-radius: 6px;
  }`,
})
export class LeafletMapComponent implements AfterContentInit, OnInit {
  map: L.Map | undefined;
  private markers: L.CircleMarker[] = [];
  private zoomLevelOnPan: number = 13;
  protected zipData?: ZipData;

  constructor(private zipFetcher: ZipFetcherService) {}

  ngOnInit(): void {
    this.getZipData();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [36.1576, -96.0311],
      zoom: 10,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.zipFetcher.selectedZip.subscribe((zipData: ZipData) => {
      if (!this.map) return;

      this.markers.forEach((m) => {
        this.map?.removeLayer(m);
      });

      var latlongs: L.LatLngExpression = [
        parseFloat(zipData.places[0].latitude),
        parseFloat(zipData.places[0].longitude),
      ];

      this.map.flyTo(latlongs, this.zoomLevelOnPan);

      var northOrSouth = latlongs[0] > 0 ? 'N' : 'S';
      var eastOrWest = latlongs[1] > 0 ? 'E' : 'W';

      var locationMarker = new L.CircleMarker(latlongs, {
        fillOpacity: 1,
        color: '#114',
        fillColor: '#38c',
        weight: 1,
      });
      var locationPopup = new L.Popup({
        content:
          `<p>${zipData.places[0]['place name']}, ${zipData.places[0]['state abbreviation']}</p>` +
          `<p>${Math.abs(latlongs[0])}&deg;${northOrSouth}, ` +
          `${Math.abs(latlongs[1])}&deg;${eastOrWest}</p>`,
      });
      locationMarker.bindPopup(locationPopup);

      this.markers.push(locationMarker);
      this.map.addLayer(this.markers[this.markers.length - 1]);
      this.markers[this.markers.length - 1].openPopup();
    });
  }

  getZipData(): void {
    this.zipFetcher.selectedZip.subscribe(
      (zipData) => (this.zipData = zipData)
    );
  }

  ngAfterContentInit(): void {
    this.initMap();
  }
}
