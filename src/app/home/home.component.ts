import { Component, OnInit } from '@angular/core';
import { Params } from '../models/base.model';
import { CharacterModel } from '../models/character.model';
import { MarvelService } from '../services/marvel.service';
import { GenericItemModel } from '../models/base.model';
import { LocalStorageService } from '../services/local-storage.service';
import { FavoriteComic } from '../models/comic.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: Array<CharacterModel> = new Array<CharacterModel>();
  params: Params = new Params();
  openModal: boolean = false;
  comicForModal: GenericItemModel = new GenericItemModel();
  favoriteComics: Array<FavoriteComic> = [];
  service: any;
  maxLimit: number = 1560;

  constructor(
    private marvelService: MarvelService,
    private localStorage: LocalStorageService,
    private searchService: SearchService) {

      this.service = this.searchService.getSearchData().subscribe(data => {
        if(data !== undefined) {
          this.params.name = data;
          this.getCharacters();
        }
      })

    }

  ngOnInit(): void {
    this.getCharacters();
    this.getFavorites();
  }

  getCharacters() {
    this.marvelService.getCharacters(this.params).subscribe(res => {
      this.characters = res.data.results;
      this.maxLimit = res.data.total - (res.data.total % 10);
    })
  }

  nextPage() {
    this.params.offset += this.params.limit;
    this.getCharacters();
  }

  previousPage() {
    this.params.offset -= this.params.limit;
    this.getCharacters();
  }

  orderBy(e: string) {
    this.params.orderBy = e;
    this.getCharacters();
  }

  onOpenModal(event: {comic: GenericItemModel, open: boolean}) {
    this.openModal = event.open;
    this.comicForModal = event.comic;
  }

  onCloseModal(event: boolean) {
    this.openModal = event;
  }

  getFavorites(): void {
    const res = this.localStorage.getData();
    if(typeof res !== 'boolean') {
      this.favoriteComics = res;
    }
  }

  addedComic(e: boolean) {
    if (e) {
      this.getFavorites();
    }
  }

  deletedComic(e: boolean) {
    if (e) {
      this.favoriteComics = new Array<FavoriteComic>();
      this.getFavorites();
    }
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }

}
