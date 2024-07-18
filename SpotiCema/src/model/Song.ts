export class Song{
    private nombre: string;
    private artista: string;
    private album: string;

    constructor(nombre: string, artista: string, album: string){
        this.nombre = nombre;
        this.artista = artista;
        this.album = album;
    }

    getNombre(): string{
        return this.nombre;
    }

    setNombre(nombre: string){
        this.nombre = nombre;
    }

    getArtista(): string{
        return this.artista;
    }

    setArtista(artista: string){
        this.artista = artista;
    }

    getAlbum(): string{
        return this.album;
    }

    setAlbum(album: string){
        this.album = album;
    }
}