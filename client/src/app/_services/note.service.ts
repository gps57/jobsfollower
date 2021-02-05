import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Note } from '../_models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl = environment.apiUrl;
  notes: Note[] = [];
  jobId = -1;

  constructor(private http: HttpClient) { }

  getNotes(jobId: number) {
    if(this.jobId == jobId) {
      // I already have the notes for this jobId cached in notes[]
      return of(this.notes);
    }
    
    // I don't have the notes for this jobId.
    this.jobId = jobId;
    return this.http.get<Note[]>(this.baseUrl + 'notes/' + jobId).pipe(
      tap(r => {
        console.log("note array: ", r);
        if(r.length > 0){
          this.notes = r;
        } else {
          this.notes = [];
        }
        
      })
    ) 
  }
}
