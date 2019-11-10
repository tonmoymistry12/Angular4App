import { Component, EventEmitter, Output } from '@angular/core';
import {Note} from '../../interfaces/note';
import {NoteService} from '../../services/note.service';

@Component({
  selector: 'app-notes-update-view',
  templateUrl: './notes-update-view.component.html',
  styleUrls: ['./notes-update-view.component.css']
})
export class NotesUpdateViewComponent  {
  public data = {}
  currentDate = new Date();
  @Output() onUpdateClick = new EventEmitter<void>();
  constructor(
    private _noteService: NoteService
  ) {
    this._noteService.myMethod$.subscribe((data) => {
      this.data = data; // And he have data here too!
   }
    );
  } 
 
}
