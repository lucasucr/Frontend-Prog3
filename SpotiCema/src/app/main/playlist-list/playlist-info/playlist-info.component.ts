import { Component, Input } from '@angular/core';
import { Playlist } from 'src/model/Playlist';
import { Song } from 'src/model/Song';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrl: './playlist-info.component.css'
})
export class PlaylistInfoComponent {

  @Input() playlist?: Playlist;

}
