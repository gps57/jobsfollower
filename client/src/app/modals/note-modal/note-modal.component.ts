import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Note } from 'src/app/_models/note';
import { NoteService } from 'src/app/_services/note.service';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {
  newNote: string;
  title: string;
  jobId: number;

  constructor(public bsModalRef: BsModalRef, private noteService: NoteService) { }

  ngOnInit(): void {
  }

  saveNewNote() {
    // assuming this is right for now.  But where does the content come from?  Where does the this.jobId come from?
    const note: Note = {
      content: this.newNote,
      jobId: this.jobId
    }

    this.noteService.saveNewNote(note)
      .subscribe(
        () => {
          this.bsModalRef.hide();
        }
      );
  }

  updateNotes() {
    // this.newNoteEm.emit(this.newNote);
    this.bsModalRef.hide();
  }

}
