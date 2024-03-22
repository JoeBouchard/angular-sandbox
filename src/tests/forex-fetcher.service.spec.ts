import { TestBed } from '@angular/core/testing';

import { ForexFetcherService } from '../services/forex-fetcher.service';

describe('ForexFetcherService', () => {
  let service: ForexFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForexFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
