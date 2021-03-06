import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  
  // this next line sets up warnings to user if they change something then navigate from the page without saving
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

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
    this.jobService.updateJob(this.job).subscribe(() => {
      this.toastr.success("Job profile updated successfully");
      this.editForm.reset(this.job);      
    })
  }

  canDeactivate() {
    if (this.editForm.dirty){
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }

}
