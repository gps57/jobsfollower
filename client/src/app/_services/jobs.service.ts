import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  baseUrl = environment.apiUrl;
  jobs: Job[] = [];
  paginatedResult: PaginatedResult<Job[]> = new PaginatedResult<Job[]>();
  jobsDisplayAsList: boolean = true;

  constructor(private http: HttpClient) { }

  getJobs(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<Job[]>(this.baseUrl + 'jobs', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
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
