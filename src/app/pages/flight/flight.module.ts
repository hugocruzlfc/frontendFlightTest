import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight.component';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [FlightComponent],
  imports: [CommonModule, MatTableModule, MatCardModule, MatChipsModule],
  exports: [FlightComponent],
})
export class FlightModule {}
