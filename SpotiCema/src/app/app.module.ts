import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeCardComponent } from './main/welcome-card/welcome-card.component';
import { PlaylistListComponent } from './main/playlist-list/playlist-list.component';
import { PlaylistInfoComponent } from './main/playlist-list/playlist-info/playlist-info.component';
import { SongInfoComponent } from './main/playlist-list/playlist-info/song-info/song-info.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    WelcomeCardComponent,
    PlaylistListComponent,
    PlaylistInfoComponent,
    SongInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
