import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vessel } from '../models/vessel.models';

@Injectable()
export class VesselApiService {

  readonly endpoint = 'https://frontendteamfiles.blob.core.windows.net/exercises';

  constructor(private http: HttpClient) { }

  fetch() {
    return this.http.get<Vessel[]>(`${this.endpoint}/vessels.json`);
  }
}
