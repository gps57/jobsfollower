import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-grid',
  templateUrl: './job-grid.component.html',
  styleUrls: ['./job-grid.component.css']
})

export class JobGridComponent implements OnInit {
  jobs: Job[];

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }
}
