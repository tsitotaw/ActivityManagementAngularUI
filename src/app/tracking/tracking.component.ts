import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../activity/type/ActivityType';
import { ConstantHelperService } from '../common/constant.service';
import { ActivityTrackingService } from './activity-tracking.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  displayedColumns: string[] = ['title', 'typeId', 'categoryId'];
  dataSource: ActivityType[] = [];
  typeForm!: FormGroup;
  types: any = [];
  constructor(
    private fb: FormBuilder,
    private activityTrackingService: ActivityTrackingService,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router
  ) {
    this.typeForm = fb.group({
      title: [''],
    });
  }

  ngOnInit(): void {
    this.activityTrackingService.getActivityTracking().subscribe((data) => {
      this.dataSource = this.transformDataSource(data);
    });

    this.activityService.getAllActivities().subscribe((data) => {
      this.types = this.transformDataSource(data);
    });
  }

  transformDataSource(data: any) {
    return data['data'];
  }

  getTypeName(typeId: string) {
    return _.find(this.types, { _id: typeId }).name;
  }

  getCategoryName(typeId: string, categoryId: string) {
    let categories = _.find(this.types, { _id: typeId }).categories;
    return _.find(categories, { _id: categoryId }).name;
  }

  searchType() {
    // this.activityService.getActivityByName(this.typeForm.value.name).subscribe(data => {
    //   this.dataSource = this.transformDataSource(data);
    // });
  }

  goToDetailView(id: String) {
    this.router.navigate(['activity', 'type', id]);
  }

  goToAddTrackingView($event: any) {
    this.router.navigate(['tracking', 'create']);
    // $event.stopPropagation();
  }
}
