import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seeker } from '../_models/seeker';

@Injectable({
  providedIn: 'root'
})
export class SeekersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSeekers() {
    return this.http.get<Seeker[]>(this.baseUrl + 'users');
  }

  getSeeker(username: string){
    return this.http.get<Seeker>(this.baseUrl + 'users/' + username);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

}
