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

  changeOption(e: any) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'Name':
        this.orderBy.emit('name');
        break;
      case 'Creation date':
        this.orderBy.emit('modified');
        break;
      default:
        this.orderBy.emit('');
        break;
    }
  }

}
