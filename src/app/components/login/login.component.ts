import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginDTO } from '../../models/loginDTO';
import { BASE_ENDPOINT } from '../../config/app';
import swal from 'sweetalert';
import { LoginRespuesta } from '../../models/loginRespuesta';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formularioLogin: FormGroup<any>;

  public mensajeError: string = "";

  public hayMensaje: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {

    this.formularioLogin = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

  }

  public loginUsuario() {

    let body = new URLSearchParams();
    body.set('username', this.formularioLogin.get("email")?.value);
    body.set('password', this.formularioLogin.get("password")?.value);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      responseType: 'text' as 'text',
      withCredentials: true
    };

    this.httpClient.post(BASE_ENDPOINT+"/login", body.toString(), options)
    .subscribe(
      (data) => {
        swal(data);
        if (data.includes("Login correcto")) {
          swal("Usted se ha logueado correctamente!!!");
          this.router.navigate(['/']);
        } else {
          swal("Email o contraseña incorrectas, intente nuevamente!!!");
        }

      });

  }

}
