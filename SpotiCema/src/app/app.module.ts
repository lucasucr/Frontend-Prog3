import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeCardComponent } from './main/welcome-card/welcome-card.component';
import { PlaylistListComponent } from './main/playlist-list/playlist-list.component';
import { PlaylistInfoComponent } from './main/playlist-list/playlist-info/playlist-info.component';
import { SongInfoComponent } from './main/playlist-list/playlist-info/song-info/song-info.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from 'src/services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    WelcomeCardComponent,
    PlaylistListComponent,
    PlaylistInfoComponent,
    SongInfoComponent,
    NotFoundComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
