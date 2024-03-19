import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodePageComponent } from '../app/zip-code-page/zip-code-page.component';

describe('ZipCodePageComponent', () => {
  let component: ZipCodePageComponent;
  let fixture: ComponentFixture<ZipCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZipCodePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZipCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
