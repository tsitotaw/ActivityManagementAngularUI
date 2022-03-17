import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService } from 'src/app/activity/activity.service';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { LocalHttpClient } from 'src/app/local-http-client.service';
import { ActivityTrackingService } from '../activity-tracking.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateTrackingComponent implements OnInit, OnDestroy {
  types: any[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  subscription!: Subscription;

  typeForm!: FormGroup;
  lessonForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activityTrackingService: ActivityTrackingService,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router
  ) {
    this.typeForm = fb.group({
      title: [''],
      type: [{}],
      category: [{}],
      details: this.fb.array([this.createDetail()], Validators.required),
    });
  }

  createDetail(): FormGroup {
    return this.fb.group({
      quantity: [null, Validators.required],
      subcategoryId: [null, Validators.required],
      beneficiary: [null, Validators.required],
      trackingDate: [null, Validators.required],
    });
  }

  get details(): FormArray {
    return <FormArray>this.typeForm.get('details');
  }
  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe((data) => {
      this.types = this.transformDataSource(data);
    });
  }

  addLesson() {
    this.details.push(this.createDetail());
  }
  transformDataSource(data: any) {
    return data['data'];
  }

  deleteTrackingDetail(indexer: number) {
    this.details.removeAt(indexer);
  }

  saveTracking() {
    let newTracking = {
      title: this.typeForm.value.title,
      typeId: this.typeForm.value.type._id,
      categoryId: this.typeForm.value.category._id,
      details: this.prepareAndReturnDetails(this.typeForm.value.details),
    };

    this.subscription = this.activityTrackingService
      .saveActivityTracking(newTracking)
      .subscribe((data: any) => {
        if (!data.success) {
          alert('Error while Adding Tracking !');
        } else {
          alert('New Tracking is Saved Successfully!');
          this.router.navigate(['tracking']);
        }
      });
  }

  prepareAndReturnDetails(details: any) {
    let subDetails: any = [];

    for (let detail of details) {
      subDetails.push({
        beneficiary: detail.beneficiary,
        quantity: detail.quantity,
        subcategoryId: detail.subcategoryId._id,
        trackingDate: detail.trackingDate.toISOString(),
      });
    }

    return subDetails;
  }
  loadCategory(type: any) {
    this.categories = type.value.categories;
  }

  loadSubcategory(category: any) {
    this.subcategories = category.value.subcategories;
  }

  goToDetailView(row: any) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
