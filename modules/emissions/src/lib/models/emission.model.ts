/**
 * Interface for the Emissions data
 */
export interface Emission {
  id: number;
  timeSeries: EmissionSeries[];
}

export interface EmissionSeries {
  report_from_utc: string;
  report_to_utc: string;
  co2_emissions: number;
  sox_emissions: number;
  nox_emissions: number;
  pm_emissions: number;
  ch4_emissions: number;
}
