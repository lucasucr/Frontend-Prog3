export class Usuario {
    private id: number;
    private nombre: string;
    private apellido: string;
    private username: string;
    private password: string;
    constructor(id: number, nombre: string, apellido: string, username: string, password: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.password = password;
    }
    
    getId(): number { 
        return this.id; 
    }

    setId(id: number): void {
        this.id = id;
    }

    getNombre(): string {
        return this.nombre;
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    getApellido(): string {
        return this.apellido;
    }

    setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    getUsername(): string{
        return this.username;
    }

    setUsername(username: string): void{
        this.username = username;
    }

    getPassword(): string{
        return this.password;
    }

    setPassword(password: string): void{
        this.password = password;
    }
}