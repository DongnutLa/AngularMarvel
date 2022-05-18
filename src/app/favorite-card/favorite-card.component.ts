import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteComic } from '../models/comic.model';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  private _favoriteComic: FavoriteComic = new FavoriteComic();
  @Input() set favoriteComic(favoriteComic: FavoriteComic){
    this._favoriteComic = favoriteComic;
  }
  get favoriteComic(): FavoriteComic {
    return this._favoriteComic;
  }

  @Output() deletedComic = new EventEmitter<boolean>();

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  onDelete(id: FavoriteComic['id']) {
    const res = this.localStorage.deleteData(id);
    if(res) {
      console.log('Comic borrado');
    } else {
      console.error('No se pudo borrar el comic')
    }
    this.deletedComic.emit(res);
  }

}
