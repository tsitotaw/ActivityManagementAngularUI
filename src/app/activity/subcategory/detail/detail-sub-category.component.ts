import { ActivityType } from './../../type/ActivityType';
import { ActivityService } from './../../activity.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivatedRoute, Router } from '@angular/router';

interface ICategory {
  _id: string;
  name: string;
  code: string;
}
@Component({
  selector: 'app-detail-sub-category',
  templateUrl: './detail-sub-category.component.html',
  styleUrls: ['./detail-sub-category.component.css'],
})
export class DetailSubCategoryComponent implements OnInit {
  detailForm!: FormGroup;
  typeId: string = '';
  categoryId: string = '';
  subcategoryId: string = '';
  selectedTypeName: string = '';
  selectedCategoryName: string = '';

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
      uom: [''],
    });

    this.activatedRoute.params.subscribe((param) => {
      this.typeId = param['typeid'];
      this.categoryId = param['categoryid'];
      this.subcategoryId = param['subcategoryid'];
    });
  }

  ngOnInit(): void {
    this.activityService.getActivityById(this.typeId).subscribe((data) => {
      let categories: any = this.transformDataSource(data);
      let selectedCategory: any = this.filterCategoryById(
        categories,
        this.categoryId
      );
      let selectedSubCategory: any = this.filterSubcategoryById(
        selectedCategory.subcategories,
        this.subcategoryId
      );
      this.detailForm.setValue({
        name: selectedSubCategory.name,
        code: selectedSubCategory.code,
        uom: selectedSubCategory.uom ? selectedSubCategory.uom : '',
      });
    });
  }
  transformDataSource(data: any) {
    this.selectedTypeName = data.data[0].name;
    return data.data[0].categories;
  }

  filterCategoryById(categories: ICategory[], categoryId: string) {
    return categories.find((d) => d._id == categoryId);
  }

  filterSubcategoryById(subcategories: ICategory[], subcategoryId: string) {
    return subcategories.find((d) => d._id == subcategoryId);
  }

  onSubmit() {
    /**
     * validate first
     */
    console.log(this.detailForm.value);

    // this.activityService.updateActivitySubCategory(this.typeId, this.categoryId, this.subcategoryId, this.detailForm.value).subscribe(data => {
    //   alert("Successfully Updated!");

    // });
  }
}
