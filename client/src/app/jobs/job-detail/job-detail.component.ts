import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job;

  constructor(private jobService: JobsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadJob();
  }

  loadJob() {
    this.jobService.getJob(Number(this.route.snapshot.paramMap.get('id'))).subscribe(job => {
        this.job = job;
      });
  }
}
