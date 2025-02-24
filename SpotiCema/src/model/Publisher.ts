import { Usuario } from './Usuario';
import { Playlist } from './Playlist';

export class Publisher extends Usuario {
    
    private playlistsCreadas: Playlist[];

    constructor(id: number, nombre: string, apellido: string, username: string, password: string, playlists: Playlist[]) {
        super(nombre, apellido, username, password);
        this.setId(id);
        this.setType("publisher");
        this.playlistsCreadas = playlists;
    }

    getPlaylistsCreadas(): Playlist[]{
        return this.playlistsCreadas;
    }

    setPlaylistsCreadas(playlists: Playlist[]): void{
        this.playlistsCreadas = playlists;
    }
}