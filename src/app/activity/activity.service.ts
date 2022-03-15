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

  updateActivitySubCategory(typeId:string, categoryId:string, subCategoryId:string,subcategoryDetail:[string,string, string]){
    return this.localHttpClient.put(this.constantHelperService.SERVER_API_URL + "activities/" + typeId + "/category/" + categoryId + "/subcategory/" + subCategoryId, subcategoryDetail);
  }


  saveActivityType(typeDetail:[string,string]){
    return this.localHttpClient.post(this.constantHelperService.SERVER_API_URL + "activities", typeDetail);
  }
}
