import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantHelperService } from '../common/constant.service';
import { LocalHttpClient } from '../local-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private httpClient:HttpClient, private localHttpClient: LocalHttpClient, private constantHelperService:ConstantHelperService) { }

  getAllActivities(){
    return this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities");
  }

  getActivityById(typeId: string){
    return this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities/"+ typeId);
  }

  getActivityByName(name: string){
    return this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities?name="+ name);
  }

  updateActivityType(typeId:string, typeDetail:[string,string]){
    return this.localHttpClient.put(this.constantHelperService.SERVER_API_URL + "activities/" + typeId, typeDetail);
  }

  saveActivityType(typeDetail:[string,string]){
    return this.localHttpClient.post(this.constantHelperService.SERVER_API_URL + "activities", typeDetail);
  }

  saveActivityCategory(typeId:string, categoryDetail:[string,string]){
    return this.localHttpClient.post(this.constantHelperService.SERVER_API_URL + "activities/" + typeId + "/category" , categoryDetail);
  }

  getCategoryById(categoryId: string){
    return this.localHttpClient.get(this.constantHelperService.SERVER_API_URL + "activities/"+ categoryId + "/category");
  }

}
