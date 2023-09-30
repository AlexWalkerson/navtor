import { Emissions } from '../models/emissions.model';

export const createEmissionsEntity = (id: number): Emissions => ( {
  id,
  timeSeries: [
    {
      'report_from_utc': '2023-01-02T12:30:00', 'report_to_utc': '2023-01-02T17:06:00', 'co2_emissions': 8.34,
      'sox_emissions': 0.01, 'nox_emissions': 0.17, 'pm_emissions': 0.01153, 'ch4_emissions': 0.13
    },
    {
      'report_from_utc': '2023-01-02T17:06:00', 'report_to_utc': '2023-01-04T05:00:00', 'co2_emissions': 50.65,
      'sox_emissions': 0.08, 'nox_emissions': 1.03, 'pm_emissions': 0.07004, 'ch4_emissions': 0.79
    }
  ]
} );
