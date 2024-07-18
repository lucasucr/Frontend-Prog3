import { Component } from '@angular/core';
import { Usuario } from 'src/model/Usuario';
import { Playlist } from 'src/model/Playlist';
import { Song } from 'src/model/Song';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
  usuario: Usuario
  playlists: Array<Playlist>

  constructor() { 
    this.usuario = new Usuario("Jhon", "Doe")
    const song1 = new Song("Every Breath You Take", "The Police", "Synchronicity")
    const song2 = new Song("The Unforgiven III", "Metallica", "Death Magnetic")
    const song3 = new Song("Hotel California", "Eagles", "Hotel California")
    const song4 = new Song("I'm Still Standing", "Elton John", "Too Low For Zero")
    const song5 = new Song("Save Me", "Avenged Sevenfold", "Nightmare")
    const playlist1 = new Playlist("Musica", this.usuario, [song2, song3])
    const playlist2 = new Playlist("Gimnasio", this.usuario, [song2, song4, song5])
    const playlist3 = new Playlist("Estudiar", this.usuario, [song1, song3, song4])
    this.playlists = [playlist1, playlist2, playlist3]
  }

}
