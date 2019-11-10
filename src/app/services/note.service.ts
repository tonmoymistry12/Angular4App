import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Note} from '../interfaces/note';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  myMethod$: Observable<any>;
  private myMethodSubject = new BehaviorSubject<any>("");
  //readonly API_URL = environment.apiUrlRoot + '/notes';
  readonly API_URL = 'http://localhost:3000/get';

  constructor(private _http: HttpClient) {
    this.myMethod$ = this.myMethodSubject.asObservable();
  }

  myMethod(data) {
    this.myMethodSubject.next(data);
}

  public getAllNotes(): Observable<Note[]> {
    return this._http.get(this.API_URL) as Observable<Note[]>;
  }
  public getNotesdetailsonID(): Observable<Note[]> {
    return this._http.get(this.API_URL) as Observable<Note[]>;
  }
  public addNote(note: Note): Observable<Note> {
    return this._http.post(this.API_URL, note) as Observable<Note>;
  }
  public deleteNote(id:any): Observable<Note> {
    return this._http.delete(this.API_URL+"/"+id) as Observable<Note>;
  }
}
