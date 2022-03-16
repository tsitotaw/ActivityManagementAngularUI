import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../activity.service';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class TypeDetailComponent implements OnInit, OnDestroy {
  detailForm!: FormGroup;
  typeId: any;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.detailForm = fb.group({
      name: [''],
      code: [''],
    });

    this.subscription = this.activatedRoute.params.subscribe((param) => {
      this.typeId = param['id'];
    });
  }

  ngOnInit(): void {
    this.activityService.getActivityById(this.typeId).subscribe((data) => {
      let detailType: any = this.transformDataSource(data);
      this.detailForm.setValue({
        name: detailType.name,
        code: detailType.code,
      });
    });
  }
  transformDataSource(data: any) {
    return data['data'][0];
  }

  onSubmit() {
    /**
     * validate first
     */
    console.log(this.detailForm.value);

    this.activityService
      .updateActivityType(this.typeId, this.detailForm.value)
      .subscribe((data) => {
        alert('Successfully Updated!');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
