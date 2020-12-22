import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgForm} from "@angular/forms";
import { search } from './others.component'

@Component({
  selector: 'app-form',
  template: `
  <div *ngIf="formType">
    <form #formElement="ngForm" (ngSubmit)="modify(formElement)">
      <label>ID :
        <input #inputFirstName name="firstname" [(ngModel)]="cur_search.id" required>
      </label>
      <label>Type :
        <select name="type" [(ngModel)]="cur_search.type">
          <option>Infos
          <option>Playlists
        </select>
      </label>
      <input type="submit">
    </form>
  </div>

  <div *ngIf="!formType">
    <form #formElement="ngForm" (ngSubmit)="modify(formElement)">
      <label>Type :
        <select name="type" [(ngModel)]="cur_search.type">
          <option>Tracks
          <option>Artists
        </select>
      </label>
      <input style="margin-left: 50px" type="submit">
    </form>
  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class FormComponent {
  @Output() newSearch = new EventEmitter<search>();
  @Input() cur_search: search;
  @Input() formType: boolean;

  modify(formElement: NgForm) {
    if (formElement.valid) {
      this.newSearch.emit(this.cur_search);
    }
  }
}
