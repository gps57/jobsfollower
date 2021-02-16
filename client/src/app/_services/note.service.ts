import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, scan, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../_models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.apiUrl;
  notes: Note[] = [];
  jobId: number;
  notes$: Observable<Note[]> = new Observable();  // data stream emitting an array of notes.
  private noteInsertedSubject = new Subject<Note>();
  noteInsertedAction$ = this.noteInsertedSubject.asObservable(); // action stream when a new note is added

  notesWithAdd$ = merge(
    this.notes$,
    this.noteInsertedAction$
  )
  .pipe(
    scan((acc: Note[], value: Note) => [...acc, value])
  );

  constructor(private http: HttpClient) { }

  addNote(newNote: string) {
    console.log("in addNote");
    return this.http.post(this.baseUrl + 'notes', {jobId: this.jobId, content: newNote})
      .pipe(
        tap((response: Note) => console.log("new Note: ", response)),
        map((response: Note) => this.noteInsertedSubject.next(response))
      )
  }

  saveNewNote(newNote: Partial<Note>): Observable<any> {
    return this.http.put(this.baseUrl + 'notes', newNote)
      .pipe(
        shareReplay()
      );
  }

  // returns a new observable
  loadAllNotesByJobId(jobId: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl + 'notes/' + jobId)
      .pipe(
        tap(x => console.log("IN noteService.loadAllNotesByJobId, " + jobId)),
        shareReplay(1),
        catchError(this.handleError)
      );
  }

  setJobId(jobId: number){
    console.log("in setJobId, jobId is ", jobId);
    this.jobId = jobId;
    this.notes$ = this.loadAllNotesByJobId(jobId);
  }

  private handleError(err: any) {
    let errorMessage = "An error occurred." ;
    console.log(err);
    return throwError(errorMessage);
  }
}
