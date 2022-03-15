import { ActivityType } from './../../type/ActivityType';
import { LocalHttpClient } from './../../../local-http-client.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityService } from '../../activity.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  createForm!: FormGroup;
  typeId:any;
  types: any[] = [];
  dataSource:ActivityType[] = [];
  //firstCategory:any={};

  constructor(private fb:FormBuilder, private activityService: ActivityService,
    private constantHelperService:ConstantHelperService, private router: Router, private localHttpClient : LocalHttpClient) {
      this.createForm = fb.group({
        'name': [''],
        'code': ['']
      });
    }

  ngOnInit(): void {

    this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities").subscribe(data => {
      this.types = this.transformDataSource(data);
    });

    // this.firstCategory = {
    //   value: {
    //     categories: this.types[0].categories
    //   }
    // }
    // this.loadCategory(this.firstCategory);

  }

  transformDataSource(data:any){
    return data["data"];
  }

  loadCategory(data:any){
    this.typeId = data?.value?._id;
    // this.dataSource = data?.value?.categories;

  }

  onCreateTypeClicked() {
    console.log(this.dataSource)

    this.activityService.saveActivityCategory(this.typeId,this.createForm.value).subscribe(data => {
      alert("Successfully Updated!")
      this.router.navigate(["activity","type"]);
    });

  }
}
