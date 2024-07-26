import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Song } from '../model/Song';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private apiService: ApiService) { }

  crearSong(nombre: string, artista: string, album: string): Observable<Song> {
    return this.apiService.postSong(nombre, artista, album);
  }

  obtenerSongs() {
    return this.apiService.getAllSongs();
  }
}
