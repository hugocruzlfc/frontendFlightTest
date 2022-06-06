import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontendFlightTest';
  public selectFlightId!: string;

  /*
   *function to get the chosen flightId
   *
   */
  getFlightId(_id: string) {
    this.selectFlightId = _id;
  }
}
