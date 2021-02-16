import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { NoteModalComponent } from '../modals/note-modal/note-modal.component';
import { Note } from '../_models/note';
import { NoteService } from '../_services/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  @Input() notes: Note[] = [];
  @Input() jobId: number;
  @Output() newNoteEvent = new EventEmitter();

  constructor(private noteService: NoteService, private modalService: BsModalService) { }

  ngOnInit(): void {

  }

  addNewNoteModal() {
    const initialState = {
      title: 'Enter a new note...',
      jobId: this.jobId
  };

  const bsModalRef = this.modalService.show(NoteModalComponent, {initialState});

  bsModalRef.onHidden
    .pipe(
      tap(() => this.newNoteEvent.emit())
    )
      .subscribe();

};

}
