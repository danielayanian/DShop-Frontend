import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginDTO } from '../../models/loginDTO';
import { BASE_ENDPOINT } from '../../config/app';
import swal from 'sweetalert';
import { LoginRespuesta } from '../../models/loginRespuesta';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formularioLogin: FormGroup<any>;

  public mensajeError: string = "";

  public hayMensaje: boolean = false;

  constructor(private httpClient: HttpClient){

    this.formularioLogin = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

  }

  public loginUsuario(){

    const loginDTO: LoginDTO = new LoginDTO();
      loginDTO.email = this.formularioLogin.get("email")?.value;
      loginDTO.password = this.formularioLogin.get("password")?.value;

      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json; charset=utf-8');

      this.httpClient.post<LoginRespuesta>(BASE_ENDPOINT+"/login", JSON.stringify(loginDTO),
      { headers: headers } ).subscribe((data: LoginRespuesta) => {

          if(!data.status){
            this.hayMensaje = true;
            this.mensajeError = data.message;
          }else{
            this.hayMensaje = false;
            swal(data.message);
          }

        });

  }

}
