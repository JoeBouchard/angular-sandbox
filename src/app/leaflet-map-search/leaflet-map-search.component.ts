import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { Map, Control, DomUtil, ControlPosition } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-leaflet-map-search',
  standalone: true,
  imports: [SearchComponent],
  template: '<app-search style="width: 100px; height: 50px"></app-search>',
})
export class LeafletMapSearchComponent implements OnDestroy {
  private _map: Map | undefined;
  public custom!: Control;
  private position: ControlPosition = 'topleft';

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this._map?.removeControl(this.custom);
  }

  @Input()
  get map(): Map | undefined {
    return this._map;
  }
  set map(map: Map | undefined) {
    if (map) {
      this._map = map;

      let Custom = Control.extend({
        onAdd(map: Map) {
          return DomUtil.get('custom-search-component');
        },
        onRemove(map: Map) {},
      });
      this.custom = new Custom({
        position: this.position,
      }).addTo(map);
    }
  }
}
