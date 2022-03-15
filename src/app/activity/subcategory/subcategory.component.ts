import { LocalHttpClient } from './../../local-http-client.service';
import { ActivityType } from './../type/ActivityType';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  types: any[] = [];
  categories:any[]=[];
  displayedColumns: string[] = ['name', 'code','uom'];
  dataSource:any[] = [];
  typeForm!: FormGroup;
  constructor(private fb:FormBuilder, private localHttpClient: LocalHttpClient,
    private constantHelperService: ConstantHelperService, private router: Router) {
      this.typeForm = fb.group({
        'name': ['']
      });
     }

  ngOnInit(): void {
    // this.httpClient.get(this.constantHelperService.SERVER_API_URL + "activities").subscribe(data => {
    //   this.dataSource = this.transformDataSource(data);
    // });
    this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities").subscribe(data => {
      this.types = this.transformDataSource(data);
      
      // this.loadCategory(this.categories);
      
      // this.loadSubcategory(this.dataSource)
    });
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

  loadCategory(type:any){
    this.categories = type.value.categories;
  }

  loadSubcategory(data:any){
    this.dataSource = data.value.subcategories;
  }

  goToDetailView(row:any){
    let typeId:string = "1";
    let categoryId: string = "2";
    let subcategoryId:string= "2"
    this.router.navigate(['activity','subcategory',typeId, 'detail', categoryId, 'subcategory', subcategoryId]);
  }

}
