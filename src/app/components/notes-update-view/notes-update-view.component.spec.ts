import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesUpdateViewComponent } from './notes-update-view.component';

describe('NotesUpdateViewComponent', () => {
  let component: NotesUpdateViewComponent;
  let fixture: ComponentFixture<NotesUpdateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesUpdateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesUpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
