import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMapComponent } from '../app/leaflet-map/leaflet-map.component';

describe('LeafletMapComponent', () => {
  let component: LeafletMapComponent;
  let fixture: ComponentFixture<LeafletMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafletMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
