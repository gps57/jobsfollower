import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, pipe } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { catchError, take, tap } from 'rxjs/operators';
import { NoteModalComponent } from 'src/app/modals/note-modal/note-modal.component';
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
  jobId: number;
  notes$: Observable<Note[]>;
  job$: Observable<Job>;
  // bsModalRef: BsModalRef;
  errorMessage = '';

  constructor(
    private jobService: JobsService,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const sub = this.route.params.subscribe(params => {
      this.jobId = +params['id']
      console.log("in ngOnInit, jobId is: " + this.jobId);
      this.jobService.prepJobDetails(this.jobId);
      this.job$ = this.jobService.job$;
      this.notes$ = this.noteService.notes$;
    });
  }

  loadNotes() {
    this.notes$ = this.noteService.loadAllNotesByJobId(this.jobId);
  }

}

