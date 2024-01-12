import { Component, OnInit } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public formularioLogin: FormGroup<any>;

  public mensajeError: string = "";

  public hayMensaje: boolean = false;

  public camposVacios = false;

  constructor(private router: Router, 
    private userService: UserService) {

    this.formularioLogin = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

  }

  public loginUsuario() {

    this.camposVacios = false;

    if((this.formularioLogin.get("email")?.value === "")||
       (this.formularioLogin.get("password")?.value === "")){

        this.camposVacios = true;
        return;

    }else{

      this.camposVacios = false;

    }

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
        if (data.includes("Login correcto")) {

          //this.cookieService.set('userLogueado', 'true');
          sessionStorage.setItem('userLogueado', 'true');

          swal("Usted se ha logueado correctamente!!!");

          let options2 = {
            withCredentials: true
          };

          this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options2)
          .subscribe(
            (data: UserDTO) => {

              //this.cookieService.set('userNombre', data.nombre);
              sessionStorage.setItem('userNombre', data.nombre);
              sessionStorage.setItem('roles', data.roles);
              //this.cookieService.set('userLogueado', 'true');

              this.router.navigate(['inicio/' + data.nombre]);

            }
          );



            //Preguntar si esta marcado el recordarme, y en ese caso
            //crear cookie para user y pass, y que la pagina de login siempre
            //al cargarse lea esas cookies y si existen cargue los valores en los inputs




        } else {
          swal("Email o contraseña incorrectas, intente nuevamente!!!");
        }

      });

  }

  ngOnInit(): void {

    //this.cookieService.set('userLogueado', 'true', 365);

    
  }

}
