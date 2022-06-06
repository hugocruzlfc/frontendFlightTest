import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Flight } from './interfaces/flight.interface';
import { FlightService } from './services/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent implements OnInit {
  @Output() flightId = new EventEmitter<string>();
  flights$!: Observable<Flight[]>;
  //public allFlights: any = [];
  displayedColumns: string[] = ['id', 'name'];
  dataSource: any = [];
  constructor(private readonly flightService: FlightService) {}

  ngOnInit(): void {
    this.handleFlights();
    this.dataSource = this.flights$;
  }

  /*
   *function to render all flights
   *
   */
  handleFlights(): void {
    // this.flightService.allFlights().subscribe((resp) => {
    //   this.allFlights = resp.allFlights.docs;
    // });
    this.flights$ = this.flightService.allFlights();
  }

  /*
   *function to emit de flightId to comment component
   *
   */
  sendFlightId(element: string) {
    this.flightId.emit(element);
  }
}
