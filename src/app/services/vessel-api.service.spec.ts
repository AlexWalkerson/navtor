import { TestBed } from '@angular/core/testing';

import { VesselApiService } from './vessel-api.service';

describe('VesselApiService', () => {
  let service: VesselApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VesselApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
