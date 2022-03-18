import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { LocalHttpClient } from 'src/app/local-http-client.service';
import { ActivityService } from '../../activity.service';
import { ActivityType } from '../../type/ActivityType';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateSubCategoryComponent implements OnInit {
  createForm!: FormGroup;
  typeId: any;
  categoryId: any;
  types: any[] = [];
  categories: any[] = [];
  dataSource: ActivityType[] = [];
  //firstCategory:any={};

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private constantHelperService: ConstantHelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localHttpClient: LocalHttpClient
  ) {
    this.createForm = fb.group({
      name: [''],
      code: [''],
    });
  }

  ngOnInit(): void {
    this.localHttpClient
      .get(this.constantHelperService.SERVER_API_URL + 'activities')
      .subscribe((data) => {
        this.types = this.transformDataSource(data);
      });

    // this.firstCategory = {
    //   value: {
    //     categories: this.types[0].categories
    //   }
    // }
    // this.loadCategory(this.firstCategory);
  }

  transformDataSource(data: any) {
    return data['data'];
  }

  loadCategory(data: any) {
    this.categories = data.value.categories;
    this.typeId = data.value._id;
    // this.dataSource = data?.value?.categories;
  }

  loadSubCategory(data: any) {
    this.categoryId = data.value._id;
    // this.dataSource = data?.value?.categories;
  }

  onCreateSubCategoryClicked() {
    this.activityService
      .saveActivitySubCategory(
        this.typeId,
        this.categoryId,
        this.createForm.value
      )
      .subscribe((data: any) => {
        if (!data && !data['success']) {
          alert('Unable to add Subcategory - please review the error log!');
        } else {
          alert('Subcategory Successfully Added!');
          this.router.navigate(['activity', 'subcategory']);
        }
      });
  }
}
