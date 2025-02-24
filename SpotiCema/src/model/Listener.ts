import { Usuario } from './Usuario';
import { Playlist } from './Playlist';

export class Listener extends Usuario {
    
    private playlistsEscuchadas: Playlist[];

    constructor(id: number, nombre: string, apellido: string, username: string, password: string, playlists: Playlist[]) {
        super(nombre, apellido, username, password);
        this.setId(id);
        this.setType("listener");
        this.playlistsEscuchadas = playlists;
    }

    getPlaylistsEscuchadas(): Playlist[]{
        return this.playlistsEscuchadas;
    }

    setPlaylistsEscuchadas(playlists: Playlist[]): void{
        this.playlistsEscuchadas = playlists;
    }
}