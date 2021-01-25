import { createDirective } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Job } from 'src/app/_models/job';
import { JobParams } from 'src/app/_models/jobParams';
import { Pagination } from 'src/app/_models/pagination';
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

  constructor(private jobService: JobsService, private router: Router) {
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
