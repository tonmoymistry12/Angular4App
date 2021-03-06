import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoteService} from './services/note.service';
import {HttpClientModule} from '@angular/common/http';
import {NoteListComponent} from './components/note-list/note-list.component';
import {NgMaterialModule} from './NgMaterialModule';
import {NotesComponent} from './components/notes/notes.component';
import {NoteListItemComponent} from './components/note-list-item/note-list-item.component';
import {NoteEdtDialogComponent} from './components/note-edt-dialog/note-edt-dialog.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotesUpdateViewComponent } from './components/notes-update-view/notes-update-view.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

 

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteListComponent,
    NotesComponent,
    NoteListItemComponent,
    NoteEdtDialogComponent,
    HeaderComponent,
    NotesUpdateViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgMaterialModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  providers: [
    NoteService
  ],
  bootstrap: [AppComponent],
  // ensures Angular Material modal can be opened
  entryComponents: [NoteEdtDialogComponent]
})
export class AppModule {
}
