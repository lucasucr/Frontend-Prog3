import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { }

  crearPublisher(nombre: string, apellido: string, username: string, password: string){
    console.log("publisher");
    return this.apiService.postPublisher(nombre, apellido, username, password);
  }

  crearListener(nombre: string, apellido: string, username: string, password: string){
    return this.apiService.postListener(nombre, apellido, username, password);
  }

  obtenerInfoUsuario(): Observable<Usuario>{;
    return this.apiService.getUsuarioInfo();
  }
}
