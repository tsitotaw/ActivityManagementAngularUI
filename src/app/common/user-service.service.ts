import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalHttpClient } from '../local-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private localHttpClient:LocalHttpClient) {}

  authenticate(username:string, password:string):any{
    this.localHttpClient.post('localhost:4001/api/users/login', {username, password});
  }
}
