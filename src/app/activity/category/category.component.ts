import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { LocalHttpClient } from 'src/app/local-http-client.service';
import { ActivityType } from './ActivityCatagory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code'];
  dataSource:ActivityType[] = [];

  types: any[] = [];
  selectedTypeId:string="";
  firstCategory:any={};
  typeForm!: FormGroup
  constructor(private fb:FormBuilder, private localHttpClient: LocalHttpClient,
    private constantHelperService: ConstantHelperService, private router: Router) {
    this.typeForm = fb.group({
      'name': ['']
    });
  }

  ngOnInit(): void {

    this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities").subscribe(data => {
      this.types = this.transformDataSource(data);
      this.firstCategory = {
        value: {
          categories: this.types[0].categories
        }
      }
      this.selectedTypeId = this.types[0]._id;
      this.loadCategory(this.firstCategory);
    });

  }
  loadCategory(data:any){
    this.dataSource = data?.value?.categories;
    this.selectedTypeId = (data?.value?._id) ? data.value._id : this.selectedTypeId;
  }

  transformDataSource(data:any){
    return data["data"];
  }

   onSubmit() {
    let body: any = {
      username: "user",
      password: "1234"
    }

  }

  goToDetailView(category:any){
    this.router.navigate(['activity','category',this.selectedTypeId,"detail",category._id]);
  }


  goToAddView($event:any){
    this.router.navigate(["activity","category","create"]);
    $event.stopPropagation();
  }

}
