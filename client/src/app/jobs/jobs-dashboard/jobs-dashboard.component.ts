import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobParams } from 'src/app/_models/jobParams';
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

  updateFilters(newParams: JobParams){
    // these updated filters must somehow be put in the jobsStore
    // and when they do, the jobsStore must somehow notify the jobs-list
    // about the new filters.
    // don't know how to do that yet.
    console.log("new params: ", newParams);
  }

}
