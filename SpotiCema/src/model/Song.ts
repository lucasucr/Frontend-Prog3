export class Song{
    private id: number;
    private nombre: string;
    private artista: string;
    private album: string;

    constructor(id: number, nombre: string, artista: string, album: string){
        this.id = id;
        this.nombre = nombre;
        this.artista = artista;
        this.album = album;
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