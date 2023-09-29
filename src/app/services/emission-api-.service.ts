import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emission } from '../models/emission.model';

@Injectable({
  providedIn: 'root'
})
export class EmissionApiService {

  readonly endpoint = 'https://frontendteamfiles.blob.core.windows.net/exercises';

  constructor(private http: HttpClient) { }

  fetch() {
    return this.http.get<Emission[]>(`${this.endpoint}/emissions.json`);
  }
}
