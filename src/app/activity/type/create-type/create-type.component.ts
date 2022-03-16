import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityService } from '../../activity.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css'],
})
export class CreateTypeComponent implements OnInit {
  createForm!: FormGroup;
  typeId: any;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router
  ) {
    this.createForm = fb.group({
      name: [''],
      code: [''],
    });
  }

  ngOnInit(): void {}

  onCreateTypeClicked() {
    this.subscription = this.activityService
      .saveActivityType(this.createForm.value)
      .subscribe((data) => {
        alert('Successfully Updated!');
        this.router.navigate(['activity', 'type']);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
