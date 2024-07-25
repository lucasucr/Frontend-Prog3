import { Publisher } from "./Publisher";
import { Listener } from "./Listener";
import { Song } from "./Song";

export class Playlist{
    private id: number;
    private nombre: string;
    private publisher: Publisher;
    private playlistListeners: Listener[];
    private songs: Song[];

    constructor(id: number, nombre: string, publisher: Publisher, songs: Song[], listeners: Listener[]){
        this.id = id;
        this.nombre = nombre;
        this.publisher = publisher;
        this.songs = songs;
        this.playlistListeners = listeners;
    }

    getId(): number { 
        return this.id; 
    }

    setId(id: number): void {
        this.id = id;
    }

    getNombre(): string{
        return this.nombre;
    }

    setNombre(nombre: string){
        this.nombre = nombre;
    }

    getPublisher(): Publisher{
        return this.publisher;
    }

    setPublisher(publisher: Publisher){
        this.publisher = publisher;
    }

    getPlaylistListeners(): Listener[]{
        return this.playlistListeners;
    }

    setPlaylistListeners(listeners: Listener[]): void{
        this.playlistListeners = listeners;
    }

    getSongs(): Song[]{
        return this.songs;
    }

    setSongs(songs: Song[]){
        this.songs = songs;
    }
}