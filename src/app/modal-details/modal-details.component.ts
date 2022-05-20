import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GenericItemModel } from '../models/base.model';
import { ComicModel, FavoriteComic } from '../models/comic.model';
import { LocalStorageService } from '../services/local-storage.service';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent implements OnInit, OnChanges {

  private _openModal: boolean = false;
  private _comic: GenericItemModel = new GenericItemModel();
  comicData: ComicModel = new ComicModel();
  image: string = '';
  isLoading: boolean = true;

  @Input() set openModal(openModal: boolean) {
    this._openModal = openModal;
  }
  get openModal(): boolean {
    return this._openModal;
  }

  @Input() set comic(comic: GenericItemModel) {
    this._comic = comic;
  }
  get comic(): GenericItemModel {
    return this._comic;
  }

  @Output() closedModal = new EventEmitter();
  @Output() addedComic = new EventEmitter<boolean>();
  @Output() deletedComic = new EventEmitter<boolean>();

  constructor(
    private marvelService: MarvelService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['comic'] && changes['comic'].currentValue) {
        const comicUri = changes['comic'].currentValue.resourceURI?.split('/');
        const comicId = comicUri[comicUri.length-1];
        this.getComicData(+comicId);
      }
  }

  onCloseModal() {
    this.closedModal.emit(false);
  }

  getComicData(comicId: number) {
    this.isLoading = true;
    this.marvelService.getComicById(comicId).subscribe({
      next: (res) => {
        if(res && res.data && res.data.results.length > 0) {
          if(res.data.results[0].description === '' || !res.data.results[0].description) {
            res.data.results[0].description = 'There is no description available';
          }
          this.comicData = res.data.results[0];
          this.image = `${this.comicData.thumbnail.path}.${this.comicData.thumbnail.extension}`
        }
      },
      error: (err) => { this.isLoading = false },
      complete: () => { this.isLoading = false }
    })
  }

  comicOnFavs(): boolean {
    const comicsOnStorage = this.localStorage.getData();
    return comicsOnStorage.some((comic: any) => comic.id === this.comicData.id);
  }

  setFavorite(id: number, title: string, image: string) {
    let dataToSet: FavoriteComic = {
      id,
      title,
      image
    }
    const res = this.localStorage.setData(dataToSet);
    if (res == undefined) console.error('Hubo un error');
    if (res == false) console.log('Ya lo tienes en favoritos');
    if (res == true) console.log('Comic agregado a favoritos');

    this.addedComic.emit(res);
  }

  deleteFavorite(comicId: number) {
    const res = this.localStorage.deleteData(comicId);
    if(res) {
      console.log('Comic borrado');
    } else {
      console.error('No se pudo borrar el comic')
    }
    this.deletedComic.emit(res);
  }

}
