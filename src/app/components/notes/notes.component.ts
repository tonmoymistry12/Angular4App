import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Note} from '../../interfaces/note';
import {NoteService} from '../../services/note.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NoteEdtDialogComponent} from '../note-edt-dialog/note-edt-dialog.component';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  public data = {}
  private _notes: Note[];
  private readonly SNACKBAR_DELAY: number = 3000;

  constructor(
    private _noteService: NoteService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private idle: Idle, private keepalive: Keepalive
    
  ) {

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
   
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        this._getAllNotes();
      
    });

    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  ngOnInit(): void {
    this._getAllNotes();
 
  }
  
 
 

 
 
  /**
   * Delegates to the NoteService to retrieve the list of notes from the server.
   * @private
   */
  private _getAllNotes(): void {
    this._noteService.getAllNotes().subscribe((notes) => {
          this._notes = notes;
        },
        (error) => {
          this._snackBar.open('There was a problem retrieving notes from the server', 'Ok', {duration: this.SNACKBAR_DELAY});
          console.log('Error retrieving notes', error);
        });
  }

  /**
   * Called when onAddClick event emmitted by the header. Shows the add note dialog.
   * @private
   */
  private _onAddClick(): void {
    const dialogRef = this._dialog.open(NoteEdtDialogComponent, {
      height: '500px',
      width: '700px',
      data: {note: {}}
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        const note: Note = {
          title: result.title,
          content: result.content
        };

        this._noteService.addNote(note)
          .subscribe((added: Note) => {
            console.log('added note', {added});
            this._snackBar.open('Note added.', 'Ok', {duration: this.SNACKBAR_DELAY});
            this._getAllNotes();
          }, (error) => {
            console.log('error adding note', {error});
            this._snackBar.open('There was a problem adding the note.');
          });
      });
  }
  private _onDeleteClick(): void {
     this._noteService.myMethod$.subscribe((data) => {
      localStorage.setItem('id', data.id);
   });
   const id = localStorage.getItem('id');
   this._noteService.deleteNote(id)
     .subscribe(() => {
      this._snackBar.open('Note Deleted.', 'Ok', {duration: this.SNACKBAR_DELAY});
      this._getAllNotes();
    }, (error) => {
      this._snackBar.open('There was a problem deleting the note. Please select a note');
    });
   
    
  }
  private _onAutoUpdate(): void {
    this._noteService.myMethod$.subscribe((data) => {
      const note: Note = {
        title: data.title,
        content: data.content,
        id: data.id
      };
      this._noteService.updateNote(note)
          .subscribe((updated: Note) => {
            this._snackBar.open('Note saved.', 'Ok', {duration: this.SNACKBAR_DELAY});
            this._getAllNotes();
          }, (error) => {
            console.log('error Saving note', {error});
            this._snackBar.open('There was a problem updating the note.');
          });
   }); 
  }

}
