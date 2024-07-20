import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Playlist } from 'src/model/Playlist';
import { Song } from 'src/model/Song';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.css'
})
export class PlaylistListComponent implements OnChanges {

  @Input() playlists?: Array<Playlist>;
  @Input() allSongs?: Array<Song>;
  @Input() usuario?: Usuario

  moreSongs:boolean = false;
  moreSongsSelected:boolean = false;
  amountMoreSongs:number = 0;
  totalSongAmountSelectable:number = 0;
  moreSongsOptions:number[] = [];
  moreSongsSelections:number[] = [];
  newPlaylistForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newPlaylistForm = this.fb.group({
      nombre: new FormControl(''),
      song1: new FormControl({}),
      moreSongs: new FormControl(false),
      amountMoreSongs: new FormControl(0), // Initialize with default value
      additionalSongs: this.fb.array([])  // Initialize with an empty FormArray
    });
  }

  ngOnInit(){
    this.updateTotalSongAmountSelectable();
    this.generateOptions();
    this.setupFormListeners();
  }

  setupFormListeners() {
    this.newPlaylistForm.get('moreSongs')?.valueChanges.subscribe(value => {
      this.moreSongsSelected = value;
      this.onOptionChange();
    });

    this.newPlaylistForm.get('amountMoreSongs')?.valueChanges.subscribe(value => {
      this.amountMoreSongs = value;
      this.updateSongSelections();
    });
  }

  updateSongSelections() {
    const additionalSongsArray = this.newPlaylistForm.get('additionalSongs') as FormArray;
    additionalSongsArray.clear(); // Clear previous controls
  
    for (let i = 0; i < this.amountMoreSongs; i++) {
      additionalSongsArray.push(new FormControl('')); // Add new controls
    }
    console.log(additionalSongsArray.value);
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

  onSubmit(){
    // Consigo el nombre de song1 y las adicionales
    const song1Name = this.newPlaylistForm.get('song1')?.value;
    const additionalSongsArray = this.newPlaylistForm.get('additionalSongs') as FormArray;

    // Busco el objeto Song song1 y filtro valores indefinidos
    const song1 = this.allSongs?.find(song => song.getNombre() === song1Name);

    // Mapeo los nombres de las canciones adicionales y hago lo mismo
    const additionalSongsNames = additionalSongsArray.controls.map(control => control.value);
    console.log(additionalSongsNames);
    const additionalSongs = additionalSongsNames
    .map(name => this.allSongs?.find(song => song.getNombre() === name))
    .filter((song): song is Song => song !== undefined);

    // Combino song1 y additionalSongs
    const songsAdded = [song1, ...additionalSongs].filter((song): song is Song => song !== undefined);
    let playlist: Playlist = new Playlist(
      this.newPlaylistForm.value.nombre!,
      this.usuario!,
      songsAdded
    );

    this.playlists?.push(playlist);
    this.newPlaylistForm.reset();
  }
}
