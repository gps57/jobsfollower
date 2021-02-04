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

  constructor(private http: HttpClient) { }

  getNotes(jobId: number) {
    if(this.notes.length > 0){
      return of(this.notes);
    }  
    
    return this.http.get<Note[]>(this.baseUrl + 'notes/' + jobId).pipe(
      tap(r => {
        this.notes = r;
      })
    ) 
  }
}
