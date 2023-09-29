import { Vessel } from '../../models/vessel.models';

export const createVesselEntity = (id: number, name: string): Vessel => ({
    'id': id,
    'name': name,
    'mmsi': 999999901,
    'imo': 1023401,
    'companyId': 2301,
    'companyName': 'Alpha Company',
    'startDate': '1998-01-01T00:00:00Z',
    'active': true,
    'vesselType': 'Dry Cargo'
  });
