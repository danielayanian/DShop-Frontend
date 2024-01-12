import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BASE_ENDPOINT } from '../../config/app';
import swal from 'sweetalert';
import { UserDTO } from '../../models/userDTO';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private cookieService: CookieService,
    private userService: UserService) {

    this.formularioLogin = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      recordarme: new FormControl("")
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

          sessionStorage.setItem('userLogueado', 'true');

          swal("Usted se ha logueado correctamente!!!");

          //Si el login esta marcado como recordar, guardo email y password en cookies
          if(this.formularioLogin.get("recordarme")?.value){
            this.cookieService.set('email', this.formularioLogin.get("email")?.value);
            this.cookieService.set('password', this.formularioLogin.get("password")?.value);
          }/*else{
            this.cookieService.set('email', '');
            this.cookieService.set('password', '');
          }*/

          let options2 = {
            withCredentials: true
          };

          this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options2)
          .subscribe(
            (data: UserDTO) => {

              sessionStorage.setItem('userNombre', data.nombre);
              sessionStorage.setItem('roles', data.roles);

              this.router.navigate(['inicio/' + data.nombre]);

            }
          );

        } else {

          Swal.fire({text: "Email o contraseña incorrectas, intente nuevamente!!!",
          confirmButtonColor: '#FFC300',
          confirmButtonText: 'Cerrar'});

          //swal({confirmButtonColor: '#8CD4F5'}, "Email o contraseña incorrectas, intente nuevamente!!!");
        }

      });

  }

  ngOnInit(): void {

    //Si el login fue marcado como recordar, carga los datos guardados en las cookies
    this.formularioLogin.controls['email'].setValue(this.cookieService.get('email'));
    this.formularioLogin.controls['password'].setValue(this.cookieService.get('password'));

  }

}
