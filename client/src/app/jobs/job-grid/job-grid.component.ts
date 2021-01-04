import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/_models/job';
import { JobParams } from 'src/app/_models/jobParams';
import { Pagination } from 'src/app/_models/pagination';
import { JobsService } from 'src/app/_services/jobs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-grid',
  templateUrl: './job-grid.component.html',
  styleUrls: ['./job-grid.component.css']
})

export class JobGridComponent implements OnInit {
  jobs: Job[];
  pagination: Pagination;
  jobParams: JobParams;
  pageSize = environment.defaultGridPageSize;

  constructor(private jobService: JobsService) {
    this.jobParams = new JobParams(this.pageSize);
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs(this.jobParams).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.jobParams = new JobParams(this.pageSize);
    this.loadJobs();
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.loadJobs();
  }

}
