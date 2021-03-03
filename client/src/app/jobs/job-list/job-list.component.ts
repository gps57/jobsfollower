import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Job } from 'src/app/_models/job';
import { JobParams } from 'src/app/_models/jobParams';
import { Pagination } from 'src/app/_models/pagination';
import { JobsStats } from 'src/app/_models/jobsStats';
import { JobsService } from 'src/app/_services/jobs.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup} from '@angular/forms';
import { JobsStore } from '../jobs.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Input() jobsStats: JobsStats;
  @Input() allJobs$: Observable<Job[]>;
  @Output() statsChange: EventEmitter<JobsStats> = new EventEmitter<JobsStats>();

  // Forms
  jobsForm: FormGroup;
  jobsSub: Subscription;

  jobs: Job[];
  pagination: Pagination;
  jobParams: JobParams;
  pageSize = environment.defaultListPageSize;
  
  sortByList = [
    {value: 'created', display: 'Created Date'},
    {value: 'title', display: 'Job Title'},
    {value: 'company', display: 'Company'}
  ];

  constructor(
      private jobService: JobsService,
      private jobsStore: JobsStore,
      private router: Router,
      private formBuilder: FormBuilder) {
        
    this.jobParams = this.jobService.getJobParams();

    this.jobsForm = this.formBuilder.group({
      title: [''],
      company: [''],
      sortBy: ['']
    });

    this.jobsSub = this.jobsForm.valueChanges.subscribe(console.log);

  }

  ngOnInit(): void {
    this.loadJobs();
  }

  ngOnDestroy() {
    this.jobsSub.unsubscribe();
  }

  loadJobs() {
    this.jobService.setJobParams(this.jobParams);
    this.jobService.getJobs(this.jobParams).subscribe(response => {
      this.jobs = response.result;
      this.pagination = response.pagination;
    })
    this.updateStats();
  }

  updateStats() {
    this.statsChange.emit(this.jobsStats);
  }

  resetFilters() {
    this.jobParams = this.jobService.resetJobParams();
    this.loadJobs();
  }

  jobDetails(id: number){
    this.jobService.prepJobDetails(id);
    this.router.navigateByUrl('/jobs/' + id);
  }

  pageChanged(event: any) {
    this.jobParams.pageNumber = event.page;
    this.jobService.setJobParams(this.jobParams);
    this.loadJobs();
  }

}
