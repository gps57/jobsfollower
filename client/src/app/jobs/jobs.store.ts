import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Job } from "../_models/job";
import { environment } from 'src/environments/environment';
import { take, tap } from "rxjs/operators";
import { JobParams } from "../_models/jobParams";
import { JobsStats } from "../_models/jobsStats";
import { AccountService } from "../_services/account.service";
import { User } from "../_models/user";

@Injectable({
  // this makes this globally accessible
  // I'm not sure this is necessary, but I don't know how to do it differently yet.
  providedIn: 'root'
})
export class JobsStore {
  baseUrl = environment.apiUrl;
  currentUser: User;

  private jobsSubject = new BehaviorSubject<Job[]>([]);
  jobs$ : Observable<Job[]> = this.jobsSubject.asObservable();

  private jobsParamsSubject = new BehaviorSubject<JobParams>(new JobParams);
  jobsParams$: Observable<JobParams> = this.jobsParamsSubject.asObservable();

  private jobsStats = new BehaviorSubject<JobsStats>(new JobsStats);
  jobsStats$: Observable<JobsStats> = this.jobsStats.asObservable();


  constructor(private http:HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.currentUser = user);
    this.loadAllJobs();
    this.loadJobsStats();
  }

  private loadAllJobs(){
    const loadJobs$ = this.http.get<Job[]>(this.baseUrl + 'jobs/all')
      .pipe(
        tap(jobs => this.jobsSubject.next(jobs))
      ).subscribe();
  }

  private loadJobsStats() {
    const jStats$ = this.http.get<JobsStats>(this.baseUrl + 'jobs/getstats/' + this.currentUser.username)
      .pipe(
        tap(js => this.jobsStats.next(js))
      ).subscribe();
  }

  updateJobsParams(params: JobParams){
    this.jobsParamsSubject.next(params);
  }

}