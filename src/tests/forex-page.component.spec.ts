import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexPageComponent } from './forex-page.component';

describe('ForexPageComponent', () => {
  let component: ForexPageComponent;
  let fixture: ComponentFixture<ForexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForexPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
