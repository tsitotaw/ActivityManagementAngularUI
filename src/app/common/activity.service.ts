import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantHelperService } from './constant.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient:HttpClient, private constantHelperService:ConstantHelperService) { }

  getAllActivities(){
    return this.httpClient.get(this.constantHelperService.SERVER_API_URL);
  }
}
