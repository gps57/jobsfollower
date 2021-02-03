import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from 'rxjs';
import { take } from "rxjs/operators";
import { JobsStats } from "../_models/jobsStats";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";
import { JobsService } from "../_services/jobs.service";

@Injectable({
  providedIn: 'root'
})
export class JobsStatsResolver implements Resolve<JobsStats> {
  user: User;

  constructor(private jobsService: JobsService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<JobsStats> {
    return this.jobsService.getJobsStats(this.user.username);
  }
}