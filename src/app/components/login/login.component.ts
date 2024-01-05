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
  imports: [ CommonModule, RouterOutlet, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public formularioLogin: FormGroup<any>;

  public mensajeError: string = "";

  public hayMensaje: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router){

    this.formularioLogin = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });

  }

  public loginUsuario(){

    const loginDTO: LoginDTO = new LoginDTO();
      loginDTO.email = this.formularioLogin.get("email")?.value;
      loginDTO.password = this.formularioLogin.get("password")?.value;

      

let url = 'http://localhost:3030/login';

let param = {
  username: 'mary@gmail.com',
  password: 'root'
};
var payload = new HttpParams({ fromObject: param });


let body = new URLSearchParams();
body.set('username', 'mary@gmail.com');
body.set('password', 'root');

let options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
  responseType: 'text' as 'text',
  withCredentials: true
};



this.httpClient.post(url, body.toString() , options).subscribe(
          (data) => {
            swal(data);
            if(data.includes("Thisn is publickly accesible")){
              this.router.navigate(['/']);
            }else{
              this.router.navigate(['/login']);
            }
            
          });
      



  }

}
