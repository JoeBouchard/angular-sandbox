import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMapSearchComponent } from '../app/leaflet-map-search/leaflet-map-search.component';

describe('LeafletMapSearchComponent', () => {
  let component: LeafletMapSearchComponent;
  let fixture: ComponentFixture<LeafletMapSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafletMapSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeafletMapSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
