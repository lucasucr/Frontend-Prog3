import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  error: string = "";

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  formRegistro: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    role: new FormControl('listener', [Validators.required]) // Campo select para el rol
  })

  isListener(): boolean {
    return this.formRegistro.get('role')?.value === 'listener';
  }

  submitFormRegistro() {
    if (this.formRegistro.valid) {
      const formValue = this.formRegistro.value;

      if (this.isListener()) {
        // Llamar al servicio API para registrar al usuario
        this.usuarioService.crearListener(formValue.name, formValue.surname, formValue.username, formValue.password).subscribe(
          response => {
            console.log('Registro exitoso', response);
            // Redirigir al usuario a otra página, por ejemplo, a la página de login
            this.router.navigate(['/login']);
          },
          error => {
            this.error = "Ocurrio un error, por favor intente nuevamente"
          }
        );
      } else {
        // Llamar al servicio API para registrar al usuario
        this.usuarioService.crearPublisher(formValue.name, formValue.surname, formValue.username, formValue.password).subscribe(
          response => {
            console.log('Registro exitoso', response);
            // Redirigir al usuario a otra página, por ejemplo, a la página de login
            this.router.navigate(['/login']);
          },
          error => {
            this.error = "Ocurrio un error, por favor intente nuevamente"
          }
        );
      }

    } else {
      this.error = "El formulario no es valido, revise los datos"
    }
  }
}
