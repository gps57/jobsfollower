import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  job: Job;
  isExpired: boolean = false;

  constructor(private jobService: JobsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadJob();
  }

  loadJob() {
    this.jobService.getJob(Number(this.route.snapshot.paramMap.get('id'))).subscribe(job => {
        this.job = job;
      });
  }

  updateJob() {
    console.log(this.job);
    this.toastr.success("Job profile updated successfully");
  }

}
