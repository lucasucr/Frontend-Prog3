import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { Publisher } from '../model/Publisher';
import { Listener } from '../model/Listener';
import { Playlist } from '../model/Playlist';
import { Song } from '../model/Song';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  _url: string = 'http://localhost:8081/api/'

  constructor(private http: HttpClient) { }


  // USUARIO
  postPublisher(nombre: string, apellido: string, username: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(this._url + 'usuario/publisher', {
      nombre,
      apellido,
      username,
      password
    });
  }

  postListener(nombre: string, apellido: string, username: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(this._url + 'usuario/listener', {
      nombre,
      apellido,
      username,
      password
    });
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this._url + 'usuario', usuario);
  }

  deleteUsuario(usuario: Usuario): Observable<void> {
    return this.http.delete<void>(this._url + 'usuario', {
      body: usuario
    });
  }

  getUsuarioInfo(): Observable<Usuario> {
    return this.http.get<Usuario>(this._url + 'usuario')
  }

  // PLAYLIST
  postPlaylist(nombre: string, publisher: Publisher, songs: Song[]): Observable<Playlist>{
    return this.http.post<Playlist>(this._url + 'playlist', {
      nombre,
      publisher,
      songs
    });
  }

  putPlaylist(playlist: Playlist): Observable<Playlist>{
    return this.http.put<Playlist>(this._url + 'playlist', playlist);
  }

  deletePlaylist(playlist: Playlist): Observable<void>{
    return this.http.delete<void>(this._url + 'playlist', {
      body: playlist
    });
  }

  getAllPlaylists() {
    return this.http.get<Playlist[]>(this._url + 'playlist/all');
  }

  getPlaylistByNombre(nombre: string) {
    return this.http.get<Playlist[]>(this._url + 'playlist/nombre/' + nombre)
  }

  getPlaylistByPublisher(publisher: Publisher) {
    return this.http.get<Playlist[]>(this._url + 'playlist/publisher/' + publisher)
  }
  
  putAddSong(playlist: Playlist, song: Song) {
    return this.http.put<void>(this._url + 'playlist/add', {
      playlist,
      song
    });
  }

  putListenPlaylist(listener: Listener, playlist: Playlist) {
    return this.http.put<void>(this._url + '/listen', {
      listener,
      playlist
    })
  }

  // LOGIN

  login(username: string, password: string) {
    return this.http.post<boolean>(this._url + 'login', {
      username: username,
      password: password
    });
  }
}
