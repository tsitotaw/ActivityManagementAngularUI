import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../activity.service';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityType } from '../ActivityCatagory';
interface categoryType{
  name:string,
  code:string,
  _id:string
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailForm!: FormGroup;
  categoryId:any;
  typeId: string = "";

  constructor(private fb:FormBuilder, private activityService: ActivityService,
    private constantHelperService:ConstantHelperService, private router: Router, private activatedRoute:ActivatedRoute) {
      this.detailForm = fb.group({
        'name': [''],
        'code': ['']
      });

      this.activatedRoute.params.subscribe(param =>{
        this.typeId = param["typeid"];
        this.categoryId = param["categoryid"];
      });
    }

  ngOnInit(): void {
    this.activityService.getCategoryById(this.typeId, this.categoryId).subscribe(data => {
      console.log(data)
      let detailType:any = this.transformDataSource(data);
      let result:any = this.filterCategoryById(detailType.categories, this.categoryId);
      this.detailForm.setValue({
        name: result.name,
        code: result.code
      });
    });
  }
  transformDataSource(data:any){
    return data["data"][0];
  }

  filterCategoryById(categories:categoryType[], categoryId:string){
    return categories.find(d => d._id == categoryId);
  }

  onSubmit() {
    /**
     * validate first
     */
    console.log(this.detailForm.value);

    this.activityService.saveActivityCategory(this.categoryId,this.detailForm.value).subscribe(data => {
      alert("Successfully Updated!")
    });

  }
}
