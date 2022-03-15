import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { LocalHttpClient } from 'src/app/local-http-client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateTrackingComponent implements OnInit {
  types: any[] = [];
  categories: any[] = [];

  typeForm!: FormGroup;
  lessonForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private localHttpClient: LocalHttpClient,
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
      beenficiary: [null, Validators.required],
      trackingDate: [null, Validators.required],
    });
  }

  get details(): FormArray {
    return <FormArray>this.typeForm.get('details');
  }
  ngOnInit(): void {
    this.localHttpClient
      .get(this.constantHelperService.SERVER_API_URL + 'activities')
      .subscribe((data) => {
        this.types = this.transformDataSource(data);
      });
  }

  addLesson() {
    this.details.push(this.createDetail());
  }
  transformDataSource(data: any) {
    return data['data'];
  }
  deleteTrackingDetail(i: any) {}

  onSubmit() {}

  loadCategory(type: any) {
    this.categories = type.value.categories;
  }

  loadSubcategory(data: any) {}

  goToDetailView(row: any) {}
}
