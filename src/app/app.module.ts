import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CharactersMenuComponent } from './characters-menu/characters-menu.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { FavoriteCardComponent } from './favorite-card/favorite-card.component';
import { ModalDetailsComponent } from './modal-details/modal-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { DatesPipe } from './pipes/dates.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CharactersMenuComponent,
    CharacterCardComponent,
    FavoriteCardComponent,
    ModalDetailsComponent,
    CharacterDetailsComponent,
    DatesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
