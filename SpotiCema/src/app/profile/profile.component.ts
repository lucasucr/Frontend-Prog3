import { Component, } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Usuario } from 'src/model/Usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  usuario: Usuario | undefined;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.obtenerInfoUsuario().pipe(
      switchMap((usuario: Usuario) => {
        if (usuario) {
          this.usuario = usuario;
          console.log(usuario);
          return of(usuario);
        } else {
          return of(null);
        }
      })
    ).subscribe(
      () => {},
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getNombre(): string { return this.usuario?.getNombre() || "-";}
  getApellido(): string { return this.usuario?.getApellido() || "-";} 
}
