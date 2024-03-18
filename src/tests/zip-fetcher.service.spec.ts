import { TestBed } from '@angular/core/testing';

import { ZipFetcherService } from '../services/zip-fetcher.service';

describe('ZipFetcherService', () => {
  let service: ZipFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
