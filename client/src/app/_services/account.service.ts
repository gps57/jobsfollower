import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // this is the base url path to the api endpoints on the server
  // TODO: don't forget to add the 's' to http when we turn on ssl security
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }

}
