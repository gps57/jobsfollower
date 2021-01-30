import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Job } from "../_models/job";
import { JobParams } from "../_models/jobParams";
import { JobsStats } from "../_models/jobsStats";
import { User } from "../_models/user";
import { AccountService } from "../_services/account.service";
import { JobsService } from "../_services/jobs.service";

@Injectable({
  providedIn: 'root'
})
export class JobsStatsResolver implements Resolve<JobsStats> {
  jobsStats: JobsStats;
  user: User;

  constructor(private jobService: JobsService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<JobsStats> | JobsStats {
    return this.jobService.getJobsStats(this.user.username);
  }
}