import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/activity/activity.service';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityTrackingService } from '../activity-tracking.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailTrackingComponent implements OnInit {
  trackingDetail: any = [];
  subscription!: Subscription;
  trackingId: string = '';
  displayedColumns: string[] = [
    'beneficiary',
    'subcategoryId',
    'quantity',
    'trackingDate',
  ];
  dataSource: any = [];
  types: any = [];

  constructor(
    private activityTrackingService: ActivityTrackingService,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((param) => {
      this.trackingId = param['id'];
    });
  }

  ngOnInit(): void {
    this.subscription = this.activityTrackingService
      .getActivityTrackingById(this.trackingId)
      .subscribe((data) => {
        this.trackingDetail = this.transformDataSource(data)[0];
        this.dataSource = this.loadDataSource(this.trackingDetail);
      });

    this.activityService.getAllActivities().subscribe((data) => {
      this.types = this.transformDataSource(data);
    });
  }

  backToList() {
    this.router.navigate(['tracking']);
  }

  transformDataSource(data: any) {
    return data['data'];
  }

  loadDataSource(detail: any) {
    return detail.details;
  }

  getTypeName(typeId: string) {
    return _.find(this.types, { _id: typeId }).name;
  }

  getCategoryName(typeId: string, categoryId: string) {
    let categories = _.find(this.types, { _id: typeId }).categories;
    return _.find(categories, { _id: categoryId }).name;
  }
}
