import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  SERVER_API_URL:string = "http://localhost:5000/api/";
  GET_ACTIVITY_SUBCATAGORY:string = "http://localhost:5000/:id/category/:categoryid";
  constructor() {}
}
