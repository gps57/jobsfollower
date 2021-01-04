import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JobAddComponent } from '../jobs/job-add/job-add.component';
import { Job } from '../_models/job';
import { JobParams } from '../_models/jobParams';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  jobs: Job[] = [];
  jobsDisplayAsList: boolean = true;

  constructor(private http: HttpClient) { }

  getJobs(jobParams: JobParams) {
    let params = this.getPaginationHeaders(jobParams.pageNumber, jobParams.pageSize);

    if (jobParams.company != null){
      params = params.append('company', jobParams.company.toString());
    }

    if (jobParams.title != null) {
      params = params.append('title', jobParams.title.toString());
    }

    return this.getPaginatedResult<Job[]>(this.baseUrl + 'jobs', params);
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

  private getPaginatedResult<T>(url: string, params: HttpParams) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders (pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}

