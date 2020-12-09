import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('editForm') editForm: NgForm;
  job: Job;
  isExpired: boolean = false; // TODO: this property needs to be added to the Job entity.

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
    this.editForm.reset(this.job);
  }

}
