import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Publisher } from '../model/Publisher'
import { Song } from '../model/Song'
import { Playlist } from '../model/Playlist'
import { Listener } from '../model/Listener';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private apiService: ApiService) { }

  crearPlaylist(nombre: string, publisher: Publisher, songs: Song[]){
    return this.apiService.postPlaylist(nombre, publisher, songs);
  }

  obtenerPlaylists() {
    return this.apiService.getAllPlaylists();
  }

  addSong(playlist: Playlist, song: Song){
    return this.apiService.putAddSong(playlist, song);
  }

  listenPlaylist(listener: Listener, playlist: Playlist){
    return this.apiService.putListenPlaylist(listener, playlist);
  }
}
