import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Playlist } from 'src/model/Playlist';
import { Song } from 'src/model/Song';
import { Usuario } from 'src/model/Usuario';
import { PlaylistService } from 'src/services/playlist.service';
import { UsuarioService } from 'src/services/usuario.service';
import { SongService } from 'src/services/song.service';
import { ApiService } from 'src/services/api.service';
import { of, switchMap, forkJoin, map } from 'rxjs';
import { Publisher } from 'src/model/Publisher';
import { Listener } from 'src/model/Listener';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnChanges {

  usuario?: Usuario
  playlists: Playlist[] = [];
  playlistsListened: Playlist[] = [];
  allSongs: Song[] = [];

  moreSongs:boolean = false;
  moreSongsSelected:boolean = false;
  amountMoreSongs:number = 0;
  totalSongAmountSelectable:number = 0;
  moreSongsOptions:number[] = [];
  moreSongsSelections:number[] = [];
  newPlaylistForm: FormGroup;
  filtro: string = '';
  playlistSelected: any;
  selectedPlaylist: any;

  listenPlaylistForm: FormGroup = new FormGroup({
    playlistToListen: new FormControl('', [Validators.required])
  })

  addSongForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    album: new FormControl('', [Validators.required])
  })

  addToPlaylistForm: FormGroup = new FormGroup({
    songName: new FormControl('', [Validators.required])
  })

  editPlaylistForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  constructor(private usuarioService: UsuarioService, private playlistService: PlaylistService, private songService: SongService, private apiService: ApiService, private fb: FormBuilder) {
    this.newPlaylistForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      song1: new FormControl({}, [Validators.required]),
      moreSongs: new FormControl(false, [Validators.required]),
      amountMoreSongs: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]), // Initialize with default value
      additionalSongs: this.fb.array([], [Validators.required])  // Initialize with an empty FormArray
    });
  }

  ngOnInit(){
    this.updateTotalSongAmountSelectable();
    this.generateOptions();

    this.usuarioService.obtenerInfoUsuario().pipe(
      switchMap((usuario: Usuario) => {
        if (usuario) {
          this.usuario = usuario;
          console.log(usuario);
    
          const songs$ = this.songService.obtenerSongs().pipe(
            map(songs => songs || []) // Ensure songs$ returns an array
          );
    
          if (this.isListener(this.usuario)) {
            const playlists$ = this.playlistService.obtenerPlaylists().pipe(
              map(playlists => playlists || []) // Ensure playlists$ returns an array
            );
            const playlistsListened$ = of(this.usuario.getPlaylistsEscuchadas());
            return forkJoin([songs$, playlists$, playlistsListened$]);
          } else if (this.isPublisher(this.usuario)) {
            const playlists$ = of(this.usuario.getPlaylistsCreadas());
            return forkJoin([songs$, playlists$, []]);
          } else {
            return of([[], [], []] as [Song[], Playlist[], Playlist[]]);
          }
        } else {
          return of([[], [], []] as [Song[], Playlist[], Playlist[]]);
        }
      })
    ).subscribe(([songs, playlists, playlistsListened]: [Song[], Playlist[], Playlist[]]) => {
      this.allSongs = songs;
      this.playlists = playlists;
      this.playlistsListened = playlistsListened;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }

  isPublisher(user: Usuario): user is Publisher {
    return user.getType() === "publisher";
  }

  isListener(user: Usuario): user is Listener {
    return user.getType() === "listener";
  }

  changeFiltro() {
    console.log(this.filtro);
  }

  updateSongSelections() {
    console.log(this.amountMoreSongs);
    const additionalSongsArray = this.newPlaylistForm.get('additionalSongs') as FormArray;
    console.log('alo: ' + additionalSongsArray.value);
    additionalSongsArray.clear(); // Clear previous controls
  
    for (let i = 0; i < this.amountMoreSongs; i++) {
      additionalSongsArray.push(new FormControl('')); // Add new controls
    }
  }

  onOptionChange() {
    this.moreSongs = this.moreSongsSelected;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['allSongs']) {
      this.updateTotalSongAmountSelectable();
      this.generateOptions();
    }
  }

  updateTotalSongAmountSelectable() {
    if (this.allSongs) {
      this.totalSongAmountSelectable = this.allSongs.length - 1;
    } else {
      this.totalSongAmountSelectable = 0;
    }
  }

  generateOptions() { //Funcion para generar opciones para ngFor de cantidad de canciones a agregar
    this.moreSongsOptions = Array.from({ length: this.totalSongAmountSelectable }, (_, i) => i + 1);
  }

  get additionalSongsArray() {
    return this.newPlaylistForm.get('additionalSongs') as FormArray;
  }

  setPlaylistSelected(playlist: Playlist) {
    this.playlistSelected = playlist;
  }

  onSubmit(){
    // Consigo el nombre de song1 y las adicionales
    const song1Name = this.newPlaylistForm.get('song1')?.value;
    const additionalSongsArray = this.newPlaylistForm.get('additionalSongs') as FormArray;

    // Busco el objeto Song song1 y filtro valores indefinidos
    const song1 = this.allSongs?.find(song => song.getNombre() === song1Name);

    // Mapeo los nombres de las canciones adicionales y hago lo mismo
    const additionalSongsNames = additionalSongsArray.controls.map(control => control.value);
    const additionalSongs = additionalSongsNames
    .map(name => this.allSongs?.find(song => song.getNombre() === name))
    .filter((song): song is Song => song !== undefined);

    // Combino song1 y additionalSongs
    const songsAdded = [song1, ...additionalSongs].filter((song): song is Song => song !== undefined);
    if(this.usuario){
      this.playlistService.crearPlaylist(this.newPlaylistForm.value.nombre!, this.usuario as Publisher, songsAdded).subscribe((playlist: Playlist) => {
        this.playlists.push(playlist);
        this.newPlaylistForm.reset();
      }, error => {
        console.error('Error creating playlist:', error);
      });
    }
  }

  listenPlaylist() {
    const playlistListen = this.playlists?.find(playlist => playlist.getNombre() === this.listenPlaylistForm.value.playlistToListen);

    if(this.usuario){
      this.playlistService.listenPlaylist(this.usuario as Listener, playlistListen!).subscribe(() => {
        this.playlists.push(playlistListen!);
        this.listenPlaylistForm.reset();
      }, error => {
        console.error('Error listening playlist:', error);
      });
    }
  }

  addSong() {
    if(this.usuario){
      this.songService.crearSong(this.addSongForm.value.name!, this.addSongForm.value.artist!, this.addSongForm.value.album!).subscribe((song: Song) => {
        this.allSongs.push(song);
        this.addSongForm.reset();
      }, error => {
        console.error('Error creating song:', error);
      });
    }
  }

  addToPlaylist(){
    const songToAdd = this.allSongs?.find(song => song.getNombre() === this.addToPlaylistForm.value.songName);

    if(this.usuario){
      this.playlistService.addSong(this.playlistSelected, songToAdd!).subscribe(() => {
        this.playlistSelected.getSongs().push(songToAdd!);
        this.addToPlaylistForm.reset();
        this.playlistSelected = '';
      }, error => {
        console.error('Error adding to playlist:', error);
      });
    }
  }

  deletePlaylist(playlist: Playlist){
    this.selectedPlaylist = playlist;

    if(this.usuario){
      this.apiService.deletePlaylist(this.selectedPlaylist).subscribe({
        next: (ok: boolean) => {
          if(ok){
            console.log('Playlist deleted successfully');
            this.playlists = this.playlists.filter(playlist => playlist !== this.selectedPlaylist);
          } else {
            console.log('Problem deleting playlist');
          }
        },
        error: (error) => {
          console.error('Error deleting playlist:', error);
        },
        complete: () => {
          this.selectedPlaylist = '';
        }
      });
    }
  }

  editPlaylist(){
    if(this.usuario){
      this.apiService.putPlaylist(this.playlistSelected).subscribe(() => {
        this.playlistSelected = '';
        this.editPlaylistForm.reset();
      }, error => {
        console.error('Error editing playlist:', error);
      });
    }
  }
}
