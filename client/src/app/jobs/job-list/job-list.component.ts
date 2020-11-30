import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: Job[];

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    })
  }

}
