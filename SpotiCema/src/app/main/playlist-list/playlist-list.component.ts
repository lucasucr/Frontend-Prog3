import { Component, Input } from '@angular/core';
import { Playlist } from 'src/model/Playlist';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent {

  @Input() playlists?: Array<Playlist>

}
