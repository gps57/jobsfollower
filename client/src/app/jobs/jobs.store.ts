import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Job } from "../_models/job";
import { environment } from 'src/environments/environment';
import { map, take, tap } from "rxjs/operators";
import { JobParams } from "../_models/jobParams";
import { JobsStats } from "../_models/jobsStats";
import { AccountService } from "../_services/account.service";
import { User } from "../_models/user";
import { PaginatedResult, Pagination } from "../_models/pagination";

@Injectable({
  // this makes this globally accessible
  // I'm not sure this is necessary, but I don't know how to do it differently yet.
  providedIn: 'root'
})
export class JobsStore {
  private baseUrl = environment.apiUrl;
  private currentUser: User;

  private jobsSubject = new BehaviorSubject<Job[]>([]);
  jobs$ : Observable<Job[]> = this.jobsSubject.asObservable();

  private jobsParams = new BehaviorSubject<JobParams>(new JobParams);
  jobsParams$: Observable<JobParams> = this.jobsParams.asObservable();

  private jobsStats = new BehaviorSubject<JobsStats>(new JobsStats);
  jobsStats$: Observable<JobsStats> = this.jobsStats.asObservable();

  private pagenatedResult = new BehaviorSubject<PaginatedResult<Job[]>>(null);
  pagenatedResult$:Observable<PaginatedResult<Job[]>> = this.pagenatedResult.asObservable();

  constructor(private http:HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentUser = user);
    this.loadAllJobs();
    this.loadPaginatedJobs();
    this.loadJobsStats();
  }

  private loadAllJobs(){
    const loadJobs$ = this.http.get<Job[]>(this.baseUrl + 'jobs/all')
      .pipe(
        tap(jobs => this.jobsSubject.next(jobs))
      ).subscribe();
  }

  private loadPaginatedJobs(){
    let jp: JobParams;

    this.jobsParams$.pipe(
      tap(p => jp=p)
    ).subscribe();

    let params = getPaginationHeaders(jp.pageNumber, jp.pageSize);

    if (jp.company != null){
      params = params.append('company', jp.company.toString());
    }

    if (jp.title != null) {
      params = params.append('title', jp.title.toString());
    }

    params = params.append('orderBy', jp.orderBy);

    getPaginatedResult<Job[]>(this.baseUrl + 'jobs', params, this.http)
      .pipe(
        tap(r => this.pagenatedResult.next(r))
      ).subscribe();
  }

  private loadJobsStats() {
    const jStats$ = this.http.get<JobsStats>(this.baseUrl + 'jobs/getstats/' + this.currentUser.username)
      .pipe(
        tap(js => this.jobsStats.next(js))
      ).subscribe();
  }

  updateJobsParams(params: JobParams){
    this.jobsParams.next(params);
  }

}

function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

function getPaginationHeaders (pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}