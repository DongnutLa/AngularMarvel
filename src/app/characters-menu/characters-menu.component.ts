import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-characters-menu',
  templateUrl: './characters-menu.component.html',
  styleUrls: ['./characters-menu.component.scss']
})
export class CharactersMenuComponent implements OnInit {

  @Output() orderBy = new EventEmitter<string>();

  form = new FormGroup({
    filters: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

  changeOption() {
    const value = this.form.controls['filters'].value;
    this.orderBy.emit(value);
  }

}
