import { ActivityType } from './../type/ActivityType';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/common/shared.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'code','uom'];
  dataSource:ActivityType[] = [];
  typeForm!: FormGroup
  constructor(private fb:FormBuilder, private httpClient: HttpClient,
    private sharedService: SharedService, private router: Router) {
      this.typeForm = fb.group({
        'name': ['']
      });
     }

  ngOnInit(): void {
    this.httpClient.get(this.sharedService.SERVER_API_URL + "activities").subscribe(data => {
      this.dataSource = this.transformDataSource(data);
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

  goToDetailView(id:String){
    this.router.navigate(['activity','type', id]);
  }

}
