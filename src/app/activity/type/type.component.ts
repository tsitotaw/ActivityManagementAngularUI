import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityService } from '../activity.service';
import { ActivityType } from './ActivityType';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'code'];
  dataSource: ActivityType[] = [];
  typeForm!: FormGroup;
  subscription!: Subscription;
  subscription2!: Subscription;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router
  ) {
    this.typeForm = fb.group({
      name: [''],
    });
  }

  ngOnInit(): void {
    this.subscription = this.activityService
      .getAllActivities()
      .subscribe((data) => {
        this.dataSource = this.transformDataSource(data);
      });
  }

  transformDataSource(data: any) {
    return data['data'];
  }

  searchType() {
    this.subscription2 = this.activityService
      .getActivityByName(this.typeForm.value.name)
      .subscribe((data) => {
        this.dataSource = this.transformDataSource(data);
      });
  }

  goToDetailView(id: String) {
    this.router.navigate(['activity', 'type', id]);
  }

  goToAddView($event: any) {
    this.router.navigate(['activity', 'type', 'create']);
    $event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
