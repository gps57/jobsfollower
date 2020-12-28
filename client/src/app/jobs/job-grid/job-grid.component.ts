import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/app/_models/job';
import { Pagination } from 'src/app/_models/pagination';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-grid',
  templateUrl: './job-grid.component.html',
  styleUrls: ['./job-grid.component.css']
})

export class JobGridComponent implements OnInit {
  jobs: Job[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs(this.pageNumber, this.pageSize).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
  }

}
