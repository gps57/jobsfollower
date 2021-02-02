import { createDirective } from '@angular/compiler/src/core';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Job } from 'src/app/_models/job';
import { JobParams } from 'src/app/_models/jobParams';
import { Pagination } from 'src/app/_models/pagination';
import { JobsStats } from 'src/app/_models/jobsStats';
import { JobsService } from 'src/app/_services/jobs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[];
  pagination: Pagination;
  jobParams: JobParams;
  pageSize = environment.defaultListPageSize;
  sortByList = [
    {value: 'created', display: 'Created Date'},
    {value: 'title', display: 'Job Title'},
    {value: 'company', display: 'Company'}
  ];
  @Input() jobsStats: JobsStats;
  @Output() statsChange: EventEmitter<JobsStats> = new EventEmitter<JobsStats>();

  constructor(private jobService: JobsService,
    private router: Router) {
    this.jobParams = this.jobService.getJobParams();
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.setJobParams(this.jobParams);
    this.jobService.getJobs(this.jobParams).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
    this.updateStats();
  }

  // setStatsParams() {
  //   // this.statsParams.totalJobs = this.pagination.totalItems;

  //   console.log("calling updateStats")
  //   this.updateStats();
  // }

  updateStats() {
    this.statsChange.emit(this.jobsStats);
  }

  resetFilters() {
    this.jobParams = this.jobService.resetJobParams();
    this.loadJobs();
  }

  jobDetails(id: number){
    this.router.navigateByUrl('/jobs/' + id);
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.jobService.setJobParams(this.jobParams);
    this.loadJobs();
  }

}
