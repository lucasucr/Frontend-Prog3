import { Usuario } from "./Usuario";
import { Song } from "./Song";

export class Playlist{
    private nombre: string;
    private publisher: Usuario;
    private songs: Song[];

    constructor(nombre: string, publisher: Usuario, songs: Song[]){
        this.nombre = nombre;
        this.publisher = publisher;
        this.songs = songs;
    }

    getNombre(): string{
        return this.nombre;
    }

    setNombre(nombre: string){
        this.nombre = nombre;
    }

    getPublisher(): Usuario{
        return this.publisher;
    }

    setPublisher(publisher: Usuario){
        this.publisher = publisher;
    }

    getSongs(): Song[]{
        return this.songs;
    }

    setSongs(songs: Song[]){
        this.songs = songs;
    }
}