import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/common/shared.service';
import { ActivityType } from './ActivityType';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code'];
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
