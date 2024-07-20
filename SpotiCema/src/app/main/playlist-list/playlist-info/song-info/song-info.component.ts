import { Component, Input } from '@angular/core';
import { Song } from 'src/model/Song';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrl: './song-info.component.css'
})
export class SongInfoComponent {

  @Input() song?: Song;

}
