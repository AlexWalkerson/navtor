import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Vessel } from '../models/vessel.models';

import { VesselApiService } from './vessel-api.service';

describe('VesselApiService', () => {
  let service: VesselApiService;
  let httpController: HttpTestingController;

  const mockVessels: Vessel[] = [
    {
      'id': 10001,
      'name': 'MS Alpha',
      'mmsi': 999999901,
      'imo': 1023401,
      'companyId': 2301,
      'companyName': 'Alpha Company',
      'startDate': '1998-01-01T00:00:00Z',
      'active': true,
      'vesselType': 'Dry Cargo'
    },
    {
      'id': 10002,
      'name': 'MS Bravo',
      'mmsi': 999999902,
      'imo': 1023402,
      'companyId': 2302,
      'companyName': 'Bravo Company',
      'startDate': '1999-02-02T00:00:00Z',
      'active': true,
      'vesselType': 'General Cargo'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VesselApiService]
    });
    service = TestBed.inject(VesselApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('should fetch vessels from the server', () => {
      service.fetch().subscribe((e: Vessel[]) => {
        expect(e).toEqual(mockVessels);
      });

      const req = httpController.expectOne(service.endpoint+'/vessels.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockVessels);
    });
  });
});
