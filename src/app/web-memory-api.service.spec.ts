import { TestBed } from '@angular/core/testing';

import { WebMemoryApiService } from './web-memory-api.service';

describe('WebMemoryApiService', () => {
  let service: WebMemoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebMemoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
