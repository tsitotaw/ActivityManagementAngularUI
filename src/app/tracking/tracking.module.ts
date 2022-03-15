import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TrackingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component:TrackingComponent}
    ]),
  ]
})
export class TrackingModule { }
