import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * we want this service to be just a wrapper of the httpClient
 * so that we depend everywhere in our app on our service, instead of the second party service
 * how can we do that?
 */
@Injectable({
  providedIn: 'root'
})
export class LocalHttpClient {

  constructor(private httpClient:HttpClient) { }

  get(url: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };} ){
    return this.httpClient.get(url, options);
  }

  post(url: string, body: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };} ){
    return this.httpClient.post(url, body, options);
  }

  put(url: string, body: any, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };} ){
    return this.httpClient.put(url, body, options);
  }

  delete(url: string, options?: { headers?: HttpHeaders | { [header: string]: string | string[]; };} ){
    return this.httpClient.delete(url, options);
  }
}
