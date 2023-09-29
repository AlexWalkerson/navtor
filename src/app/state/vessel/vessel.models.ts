/**
 * Interface for the Vessel data
 */
export interface VesselEntity {
    id: number;
    name: string;
    mmsi: number;
    imo: number;
    companyId: number;
    companyName: string;
    startDate: string;
    active: boolean;
    vesselType: string;
}
