import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobsStats } from 'src/app/_models/jobsStats';
import { JobsStore } from '../jobs.store';

@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.css']
})
export class JobsDashboardComponent implements OnInit {
  jobsStats$: Observable<JobsStats>;

  constructor(private jobsStore: JobsStore) {
    this.jobsStats$ = this.jobsStore.jobsStats$;
  }

  ngOnInit(): void {
  }

}
