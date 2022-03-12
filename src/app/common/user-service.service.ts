import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient:HttpClient) {}

  authenticate(username:string, password:string):any{
    this.httpClient.post('localhost:4001/api/users/login', {username, password});


  }
}
