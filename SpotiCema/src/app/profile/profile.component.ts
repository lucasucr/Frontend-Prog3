import { Component, Input } from '@angular/core';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() usuario!: Usuario | undefined;

  getNombre(): string { return this.usuario?.getNombre() || "-";}
  getApellido(): string { return this.usuario?.getApellido() || "-";} 
}
