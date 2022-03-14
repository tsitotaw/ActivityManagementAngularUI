import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConstantHelperService } from 'src/app/common/constant.service';
import { ActivityService } from '../activity.service';
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
  constructor(private fb:FormBuilder, private activityService: ActivityService,
    private constantHelperService:ConstantHelperService, private router: Router) {
    this.typeForm = fb.group({
      'name': ['']
    });
  }

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe(data => {
      this.dataSource = this.transformDataSource(data);
    });
  }

  transformDataSource(data:any){
    return data["data"];
  }

  goToDetailView(id:String){
    this.router.navigate(['activity','type', id]);
  }

  goToAddView($event:any){
    this.router.navigate(["activity","type","create"]);
    $event.stopPropagation();
  }

}
