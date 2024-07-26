import { Usuario } from './Usuario';
import { Playlist } from './Playlist';

export class Listener extends Usuario {
    
    private playlistsEscuchadas: Playlist[];

    constructor(id: number, nombre: string, apellido: string, username: string, password: string, playlists: Playlist[]) {
        super(id, nombre, apellido, username, password);
        this.playlistsEscuchadas = playlists;
    }

    getPlaylistsEscuchadas(): Playlist[]{
        return this.playlistsEscuchadas;
    }

    setPlaylistsEscuchadas(playlists: Playlist[]): void{
        this.playlistsEscuchadas = playlists;
    }

    override type(): string{
        return "Listener";
    }
}