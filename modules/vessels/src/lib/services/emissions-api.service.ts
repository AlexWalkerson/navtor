import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emissions } from '../models/emissions.model';

@Injectable()
export class EmissionsApiService {

  readonly endpoint = 'https://frontendteamfiles.blob.core.windows.net/exercises';

  constructor(private http: HttpClient) { }

  fetch() {
    return this.http.get<Emissions[]>(`${this.endpoint}/emissions.json`);
  }
}
