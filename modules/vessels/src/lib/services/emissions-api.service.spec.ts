import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Emissions } from '../models/emissions.model';
import { EmissionsApiService } from './emissions-api.service';

describe('EmissionsApiService', () => {
  let service: EmissionsApiService;
  let httpController: HttpTestingController;

  const mockEmissions: Emissions[] = [
    {
      id: 10001,
      timeSeries: [{
        'report_from_utc': '2023-01-01T00:00:00Z',
        'report_to_utc': '2023-01-02T00:00:00',
        'co2_emissions': 94.05,
        'sox_emissions': 1.62,
        'nox_emissions': 2.8,
        'pm_emissions': 0.37097,
        'ch4_emissions': 1.51
        }]
    },
    {
      id: 10002,
      timeSeries: [{
        "report_from_utc": "2023-01-01T11:00:00",
        "report_to_utc": "2023-01-02T11:00:00",
        "co2_emissions": 9.3,
        "sox_emissions": 0.01,
        "nox_emissions": 0.19,
        "pm_emissions": 0.01286,
        "ch4_emissions": 0.145
      }]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmissionsApiService]
    });
    service = TestBed.inject(EmissionsApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetch', () => {
    it('should fetch emissions from the server', () => {
      service.fetch().subscribe((e: Emissions[]) => {
        expect(e).toEqual(mockEmissions);
      });

      const req = httpController.expectOne(service.endpoint+'/emissions.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmissions);
    });
  });
});
