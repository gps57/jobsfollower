import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Job } from "../_models/job";
import { environment } from 'src/environments/environment';
import { tap } from "rxjs/operators";

@Injectable({
  // this makes this globally accessible
  // I'm not sure this is necessary, but I don't know how to do it differently yet.
  providedIn: 'root'
})
export class JobsStore {
  baseUrl = environment.apiUrl;

  private subject = new BehaviorSubject<Job[]>([]);

  jobs$ : Observable<Job[]> = this.subject.asObservable();

  constructor(private http:HttpClient) {
    this.loadAllJobs();
  }

  private loadAllJobs(){
    const loadJobs$ = this.http.get<Job[]>(this.baseUrl + 'jobs/all')
      .pipe(
        tap(jobs => this.subject.next(jobs))
      );
  }

}