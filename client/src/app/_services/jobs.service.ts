import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  jobs: Job[] = [];

  constructor(private http: HttpClient) { }


  getJobs() {
    return this.http.get<Job[]>(this.baseUrl + 'jobs');
  }

  getJob(jobId: number) {
    return this.http.get<Job>(this.baseUrl + 'jobs/' + jobId);
  }

  updateJob(job: Job) {
    return this.http.put(this.baseUrl + 'jobs/update/' + job.id, job);
  }



}
