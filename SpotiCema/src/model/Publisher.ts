import { Usuario } from './Usuario';
import { Playlist } from './Playlist';

export class Publisher extends Usuario {
    
    private playlistsCreadas: Playlist[];

    constructor(id: number, nombre: string, apellido: string, username: string, password: string, playlists: Playlist[]) {
        super(id, nombre, apellido, username, password);
        this.playlistsCreadas = playlists;
    }

    getPlaylistsCreadas(): Playlist[]{
        return this.playlistsCreadas;
    }

    setPlaylistsCreadas(playlists: Playlist[]): void{
        this.playlistsCreadas = playlists;
    }

    override type(): string{
        return "Publisher";
    }
}