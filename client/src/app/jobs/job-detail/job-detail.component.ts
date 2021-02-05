import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { Job } from 'src/app/_models/job';
import { Note } from 'src/app/_models/note';
import { JobsService } from 'src/app/_services/jobs.service';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job;
  notes: Note[];

  constructor(private jobService: JobsService, private noteService: NoteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadJob();
  }

  loadJob() {
    this.jobService.getJob(Number(this.route.snapshot.paramMap.get('id'))).subscribe(job => {
        console.log("job id: ", job.id);
        this.job = job;
        this.noteService.getNotes(job.id).subscribe(n => this.notes = n);
      });
    
  }
}
