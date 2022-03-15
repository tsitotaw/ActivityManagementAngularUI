import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '../activity/activity.service';
import { ActivityType } from '../activity/type/ActivityType';
import { ConstantHelperService } from '../common/constant.service';
import { ActivityTrackingService } from './activity-tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  displayedColumns: string[] = ['title', 'typeId', 'categoryId'];
  dataSource:ActivityType[] = [];
  typeForm!: FormGroup
  constructor(private fb:FormBuilder, private activityTrackingService: ActivityTrackingService,
    private constantHelperService:ConstantHelperService, private router: Router) {
    this.typeForm = fb.group({
      'title': ['']
    });
  }

  ngOnInit(): void {
    this.activityTrackingService.getActivityTracking().subscribe(data => {
      this.dataSource = this.transformDataSource(data);
    });
  }

  transformDataSource(data:any){
    return data["data"];
  }

  searchType(){
    // this.activityService.getActivityByName(this.typeForm.value.name).subscribe(data => {
    //   this.dataSource = this.transformDataSource(data);
    // });
  }

  goToDetailView(id:String){
    this.router.navigate(['activity','type', id]);
  }

  goToAddTrackingView($event:any){
    this.router.navigate(["tracking","create"]);
    // $event.stopPropagation();
  }

}
