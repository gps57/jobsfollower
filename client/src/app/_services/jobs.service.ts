import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getJobs() {
    return this.http.get<Job[]>(this.baseUrl + 'jobs');
  }

  getJob(jobId: number) {
    return this.http.get<Job>(this.baseUrl + 'jobs/' + jobId);
  }

}
