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
  firstCategory:any={};
  typeForm!: FormGroup
  constructor(private fb:FormBuilder, private localHttpClient: LocalHttpClient,
    private constantHelperService: ConstantHelperService, private router: Router) {
    this.typeForm = fb.group({
      'name': ['']
    });
  }

  ngOnInit(): void {

    // this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities/categories").subscribe(data => {
    //   this.dataSource = this.transformDataSource(data);
    //   // this.types = Object.assign([], this.dataSource);
    // });

    this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities").subscribe(data => {
      this.types = this.transformDataSource(data);
      this.firstCategory = {
        value: {
          categories: this.types[0].categories
        }
      }
      this.loadCategory(this.firstCategory);
    });

  }
  loadCategory(data:any){
    this.dataSource = data?.value?.categories;

  }

  transformDataSource(data:any){
    return data["data"];
  }

  /**
   * I need to recieve the username and password and
   * do a post request to the server api
   *
   * I need a service
   */
   onSubmit() {
    let body: any = {
      username: "user",
      password: "1234"
    }

  }

  goToDetailView(id:String){
    this.router.navigate(['activity','type', id]);
  }

}
