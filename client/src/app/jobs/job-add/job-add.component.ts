import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Job } from 'src/app/_models/job';
import { JobsService } from 'src/app/_services/jobs.service';
import { JobEditComponent } from '../job-edit/job-edit.component';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  job: Job;

  @ViewChild('addForm') addForm: NgForm;

  constructor(private jobService: JobsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addJob() {
    console.log("Adding Job");
    this.toastr.success("New Job added successfully");
    // this.jobService.updateJob(this.job).subscribe(() => {
    //   this.toastr.success("Job profile updated successfully");
    //   this.addForm.reset(this.job);      
    // })

  }

}
