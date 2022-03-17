import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CreateTrackingComponent } from './create/create.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailTrackingComponent } from './detail/detail.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    TrackingComponent,
    CreateTrackingComponent,
    DetailTrackingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TrackingComponent },
      { path: 'create', component: CreateTrackingComponent },
      { path: ':id', component: DetailTrackingComponent },
    ]),
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
  ],
})
export class TrackingModule {}
