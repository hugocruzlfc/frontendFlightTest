import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseFlight, Flight } from '../interfaces/flight.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private readonly httpClient: HttpClient) {}

  // allFlights(): Observable<ResponseFlight> {
  //   return this.httpClient.get<ResponseFlight>('/apiTest/flight/flights');
  // }
  allFlights(): Observable<Flight[]> {
    return this.httpClient.get<ResponseFlight>('/apiTest/flight/flights').pipe(
      map((resp) => {
        return resp.allFlights.docs;
      })
    );
  }
}
