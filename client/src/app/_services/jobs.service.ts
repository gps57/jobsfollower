import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  jobs: Job[] = [];
  jobsDisplayAsList: boolean = true;

  constructor(private http: HttpClient) { }

  getJobs() {
    // the of() thing make the return value an Observable which is what the component expects
    if (this.jobs.length > 0) return of(this.jobs);

    return this.http.get<Job[]>(this.baseUrl + 'jobs').pipe(
      map(jobs => {
        this.jobs = jobs;
        return jobs;
      })
    )
  }

  getJob(jobId: number) {
    const job = this.jobs.find(x => x.id === jobId);
    if (job !== undefined) return of(job);
    return this.http.get<Job>(this.baseUrl + 'jobs/' + jobId);
  }

  updateJob(job: Job) {
    return this.http.put(this.baseUrl + 'jobs/update/' + job.id, job).pipe(
      map(() => {
        const index = this.jobs.indexOf(job);
        this.jobs[index] = job;
      })
    )
  }

  addJob(job: Job) {
    
  }

  displayJobsAsList(b: boolean) {
    this.jobsDisplayAsList = b;
  }

  isDisplayList(): boolean {
    return this.jobsDisplayAsList;
  }

}
