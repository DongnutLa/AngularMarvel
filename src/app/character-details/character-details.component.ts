import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterModel } from '../models/character.model';
import { ComicModel } from '../models/comic.model';
import { EventModel } from '../models/event.model';
import { SerieModel } from '../models/serie.model';
import { StoryModel } from '../models/story.model';
import { MarvelService } from '../services/marvel.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  characterId!: number;
  characterData: CharacterModel = new CharacterModel();
  image!: string;

  comicsForCharacter: Array<ComicModel> = new Array<ComicModel>();
  storiesForCharacter: Array<StoryModel> = new Array<StoryModel>();
  seriesForCharacter: Array<SerieModel> = new Array<SerieModel>();
  eventsForCharacter: Array<EventModel> = new Array<EventModel>();

  constructor(
    private router: ActivatedRoute,
    private marvelService: MarvelService) {
    this.router.params.subscribe(param => {
      this.characterId = +param['id'];
    })
   }

  ngOnInit(): void {
    this.getCharacterData();
    this.getStories();
    this.getComics();
    this.getSeries();
    this.getEvents();
  }

  getCharacterData() {
    this.marvelService.getCharacterById(this.characterId).subscribe(res => {
      if (res.data.results[0].description === '' || !res.data.results[0].description) {
        res.data.results[0].description = 'There is no description available';
      }
      this.characterData = res.data.results[0];
      this.image = `${this.characterData.thumbnail.path}.${this.characterData.thumbnail.extension}`;
    })
  }

  getComics() {
    this.marvelService.getComicByCharacter(this.characterId).subscribe(res => {
      res.data.results.sort(() => 0.5 - Math.random());
      let comics = res.data.results.filter(s => s.thumbnail !== null);
      this.comicsForCharacter = comics;
    })
  }

  getStories() {
    this.marvelService.getStoriesByCharacter(this.characterId).subscribe(res => {
      res.data.results.sort(() => 0.5 - Math.random());
      let stories = res.data.results.filter(s => s.thumbnail !== null);
      this.storiesForCharacter = stories;
    })
  }

  getSeries() {
    this.marvelService.getSeriesByCharacter(this.characterId).subscribe(res => {
      res.data.results.sort(() => 0.5 - Math.random());
      let series = res.data.results.filter(s => s.thumbnail !== null);
      this.seriesForCharacter = series;
    })
  }

  getEvents() {
    this.marvelService.getEventsByCharacter(this.characterId).subscribe(res => {
      res.data.results.sort(() => 0.5 - Math.random());
      let events = res.data.results.filter(s => s.thumbnail !== null);
      this.eventsForCharacter = events;
    })
  }
}
