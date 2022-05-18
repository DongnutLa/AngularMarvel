import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params, ResponseModel } from '../models/base.model';
import { CharacterModel } from '../models/character.model';
import { HttpClient } from '@angular/common/http';
import { ComicModel } from '../models/comic.model';
import { StoryModel } from '../models/story.model';
import { SerieModel } from '../models/serie.model';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})

export class MarvelService {

  private _uri = 'https://gateway.marvel.com:443/v1/public';
  private ts = 'ts=1';
  private apikey = 'apikey=559bcac0f8a2ea2a025f00ff73eb372c';
  private hash = 'hash=1f2d605202fe0b0aa3810c5ac4bd251f';
  private keys = `?${this.ts}&${this.apikey}&${this.hash}`

  constructor(private http: HttpClient) { }

  getCharacters(params: Params): Observable<ResponseModel<CharacterModel>>{
    let endpoint = `${this._uri}/characters${this.keys}`;
    endpoint += `&limit=${params.limit}&offset=${params.offset}`;
    if (params.orderBy) endpoint += `&orderBy=${params.orderBy}`;
    if (params.name) endpoint += `&nameStartsWith=${params.name}`;
    return this.http.get<ResponseModel<CharacterModel>>(endpoint);
  }

  getCharacterById(characterId: number): Observable<ResponseModel<CharacterModel>>{
    let endpoint = `${this._uri}/characters/${characterId}${this.keys}`;
    return this.http.get<ResponseModel<CharacterModel>>(endpoint);
  }

  getComicById(comicId: (number | string)): Observable<ResponseModel<ComicModel>>{
    let endpoint = `${this._uri}/comics/${comicId}${this.keys}`;
    return this.http.get<ResponseModel<ComicModel>>(endpoint);
  }

  getComicByCharacter(characterId: number): Observable<ResponseModel<ComicModel>>{
    let endpoint = `${this._uri}/comics${this.keys}&characters=${characterId}`;
    return this.http.get<ResponseModel<ComicModel>>(endpoint);
  }

  getStoriesByCharacter(characterId: number): Observable<ResponseModel<StoryModel>>{
    let endpoint = `${this._uri}/stories${this.keys}&characters=${characterId}`;
    return this.http.get<ResponseModel<StoryModel>>(endpoint);
  }

  getSeriesByCharacter(characterId: number): Observable<ResponseModel<SerieModel>>{
    let endpoint = `${this._uri}/series${this.keys}&characters=${characterId}`;
    return this.http.get<ResponseModel<SerieModel>>(endpoint);
  }

  getEventsByCharacter(characterId: number): Observable<ResponseModel<EventModel>>{
    let endpoint = `${this._uri}/events${this.keys}&characters=${characterId}`;
    return this.http.get<ResponseModel<EventModel>>(endpoint);
  }

}
