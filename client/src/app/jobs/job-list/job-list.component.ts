import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Job } from 'src/app/_models/job';
import { Pagination } from 'src/app/_models/pagination';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private jobService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs(this.pageNumber, this.pageSize).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
  }

  jobDetails(id: number){
    this.router.navigateByUrl('/jobs/' + id);
  }

}
