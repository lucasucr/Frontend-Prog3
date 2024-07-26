import { Component, Input } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Usuario } from 'src/model/Usuario';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css'
})
export class WelcomeCardComponent {

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

}