import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginDTO } from '../../models/loginDTO';
import { BASE_ENDPOINT } from '../../config/app';
import swal from 'sweetalert';
import { LoginRespuesta } from '../../models/loginRespuesta';
import { UserDTO } from '../../models/userDTO';
import { UserService } from '../../services/user/user.service';

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

  constructor(private router: Router, 
    private userService: UserService) {

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

    this.userService.postLogin(BASE_ENDPOINT+"/login", body.toString(), options)
    .subscribe(
      (data) => {
        swal(data);
        if (data.includes("Login correcto")) {
          swal("Usted se ha logueado correctamente!!!");

      
          let options2 = {
            withCredentials: true
          };

          this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options2)
          .subscribe(
            (data: UserDTO) => {
              this.router.navigate(['inicio/' + data.nombre]);
            }
          );

        } else {
          swal("Email o contraseña incorrectas, intente nuevamente!!!");
        }

      });

  }

}
