import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericItemModel } from '../models/base.model';
import { CharacterModel } from '../models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  private _character: CharacterModel = new CharacterModel();
  image: string = '';

  comic: GenericItemModel = new GenericItemModel();

  @Input() set character(character: CharacterModel) {
    if(character) {
      this._character = character;
      this.image = `${character.thumbnail.path}.${character.thumbnail.extension}`
    }
  }

  get character(): CharacterModel {
    return this._character;
  }

  @Output() openModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onOpenModal(comic: GenericItemModel) {
    this.openModal.emit({comic, open: true});
  }

}
