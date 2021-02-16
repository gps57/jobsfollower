import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';
import { JobParams } from '../_models/jobParams';
import { JobsStats } from '../_models/jobsStats';
import { NoteService } from './note.service';
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
  jobId: number;
  job$: Observable<Job>;

  constructor(private http: HttpClient, private notesService: NoteService) {
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

  prepJobDetails(jobId: number) {
    this.jobId = jobId;
    console.log("in prepJobDetails calling notesService.setJobId, jobId is ", jobId);
    this.notesService.setJobId(jobId);
    this.job$ = this.http.get<Job>(this.baseUrl + 'jobs/' + this.jobId);
  }

  resetJobParams() {
    this.jobParams = new JobParams(this.pageSize);
    return this.jobParams;
  }

  getJobsStats(username: string) {
    if(this.jobsStats){
      return of(this.jobsStats);
    }  
    
    return this.http.get<JobsStats>(this.baseUrl + 'jobs/getstats/' + username).pipe(
      tap(r => {
        this.setJobsStats(r);
      })
    )    
  }

  setJobsStats(jStats: JobsStats){
    this.jobsStats = jStats;
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
    console.log("in jobsService.getJob. jobId is: " + jobId);
    this.jobId = jobId;

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
        shareReplay(1);
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

