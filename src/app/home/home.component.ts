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
  isLoading: boolean = true;
  totalPages: number = 0;
  actualPage: number = 1;
  pages = new Array<number>();
  pagesToShow = new Array<number>();

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
    this.isLoading = true;
    window.scroll(0,0);
    this.characters = new Array<CharacterModel>();
    this.marvelService.getCharacters(this.params).subscribe({
      next: (res) => {
        this.characters = res.data.results;
        this.maxLimit = res.data.total - (res.data.total % 10);
        this.totalPages = Math.ceil(res.data.total / 10);
        this.pages = Array.from({length: this.totalPages}, (_, i) => i*10)
        this.updatePagination();
  },
      error: (err) => { this.isLoading = false },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  goToPage(page: number, actual: number) {
    if(this.actualPage !== actual){
      this.params.offset = page;
      this.getCharacters();
      this.actualPage = actual;
    }
  }

  nextPage() {
    this.params.offset += this.params.limit;
    this.actualPage++;
    this.getCharacters();
  }

  previousPage() {
    this.params.offset -= this.params.limit;
    this.actualPage--;
    this.getCharacters();
  }

  updatePagination() {
    if (this.actualPage <= 6) this.pagesToShow = this.pages.slice(0,10);

    if(this.actualPage >= this.totalPages-3) {
      this.pagesToShow = this.pages.slice(this.totalPages-10,this.totalPages+1);
    }

    if(this.pages.length > 10 && this.actualPage > 6 && this.actualPage < this.totalPages-3) {
      this.pagesToShow = this.pages.slice(0+(this.actualPage-6),10+(this.actualPage-6))
    }
  }

  firstPage() {
    this.params.offset = 0;
    this.actualPage = 1;
    this.getCharacters();
  }

  lastPage() {
    this.params.offset = this.maxLimit;
    this.actualPage = this.totalPages;
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
