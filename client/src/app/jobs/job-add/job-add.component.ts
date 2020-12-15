import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  job: Job = {};

  @ViewChild('addForm') addForm: NgForm;

  constructor(private jobService: JobsService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }

  addJob() {
    console.log("Added this job: ", this.job);
    this.jobService.addJob(this.job).subscribe(() => {
      this.toastr.success("New Job added successfully");      
    })
    
    this.router.navigateByUrl('jobs');
  }

}
