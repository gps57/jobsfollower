import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JobStatsComponent } from '../dashboard/job-stats/job-stats.component';
import { JobAddComponent } from '../jobs/job-add/job-add.component';
import { Job } from '../_models/job';
import { JobParams } from '../_models/jobParams';
import { JobsStats } from '../_models/jobsStats';
import { PaginatedResult } from '../_models/pagination';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  pageSize = environment.defaultListPageSize;
  jobs: Job[] = [];
  jobParams: JobParams;
  jobsStats: JobsStats;
  jobCache = new Map();
  jobsDisplayAsList: boolean = true;

  constructor(private http: HttpClient) {
    this.jobParams = new JobParams(this.pageSize);
  }

  getJobParams() {
    return this.jobParams;
  }

  getJobsCount() {
    return this.jobs.length;
  }

  setJobParams(params: JobParams) {
    this.jobParams = params;
  }

  resetJobParams() {
    this.jobParams = new JobParams(this.pageSize);
    return this.jobParams;
  }

  getJobsStats(username: string) {
    return this.http.get<JobsStats>(this.baseUrl + 'jobs/getstats/' + username); //jobs/getstats/
  }

  getJobs(jobParams: JobParams) {
    var response = this.jobCache.get(Object.values(jobParams).join('-'));

    if(response) {
      return of(response);
    }

    let params = getPaginationHeaders(jobParams.pageNumber, jobParams.pageSize);

    if (jobParams.company != null){
      params = params.append('company', jobParams.company.toString());
    }

    if (jobParams.title != null) {
      params = params.append('title', jobParams.title.toString());
    }

    params = params.append('orderBy', jobParams.orderBy);

    return getPaginatedResult<Job[]>(this.baseUrl + 'jobs', params, this.http)
      .pipe(map(response => {
        this.jobCache.set(Object.values(jobParams).join('-'), response);
        return response;
      }))
  }

  getJob(jobId: number) {
    const job = [...this.jobCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((job: Job) => job.id === jobId);

    if (job) {
      return of(job);
    }
  
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
    return this.http.post(this.baseUrl + 'users/add-job', job).pipe(
      tap(x => {
        console.log(x);
        this.jobs.push(x);
        console.log(this.jobs);
      })
    )    
  }

  displayJobsAsList(b: boolean) {
    this.jobsDisplayAsList = b;
  }

  isDisplayList(): boolean {
    return this.jobsDisplayAsList;
  }

}

