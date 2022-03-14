import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantHelperService } from '../common/constant.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient:HttpClient, private constantHelperService:ConstantHelperService) { }

  getAllActivities(){
    return this.httpClient.get(this.constantHelperService.SERVER_API_URL + "activities");
  }

  getActivityById(typeId: string){
    return this.httpClient.get(this.constantHelperService.SERVER_API_URL + "activities/"+ typeId);
  }

  updateActivityType(typeId:string, typeDetail:[string,string]){
    return this.httpClient.put(this.constantHelperService.SERVER_API_URL + "activities/" + typeId, typeDetail);
  }
}
