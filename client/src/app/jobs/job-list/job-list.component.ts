import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs$: Observable<Job[]>;

  constructor(private jobService: JobsService, private router: Router) { }

  ngOnInit(): void {
    this.jobs$ = this.jobService.getJobs();
  }

  jobDetails(id: number){
    this.router.navigateByUrl('/jobs/' + id);
  }

}
