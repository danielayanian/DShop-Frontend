import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/userDTO';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, ReactiveFormsModule ],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {

  public nombre: string = "";

  public terminosAceptados = true;

  public passwordDiferentes = false;

  public camposVacios = false;

  public formularioRegistro: FormGroup<any>;

  constructor(private httpClient: HttpClient){

    this.formularioRegistro = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      apellido: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      repitaPassword: new FormControl("", Validators.required),
      terminos: new FormControl("")
    });

  }

  public registrarUsuario(){

    this.terminosAceptados = this.formularioRegistro.get("terminos")?.value;

    if(!this.terminosAceptados){
      this.passwordDiferentes = false;
      this.camposVacios = false;
      return;
    }

    if((this.formularioRegistro.get("nombre")?.value === "")||
       (this.formularioRegistro.get("apellido")?.value === "")||
       (this.formularioRegistro.get("email")?.value === "")||
       (this.formularioRegistro.get("password")?.value === "")||
       (this.formularioRegistro.get("repitaPassword")?.value === "")){

        this.camposVacios = true;
        this.passwordDiferentes = false;
        this.terminosAceptados = true;
        return;
    }else{
      this.camposVacios = false;
    }

    this.passwordDiferentes = (this.formularioRegistro.get("password")?.value != this.formularioRegistro.get("repitaPassword")?.value);

    if(this.passwordDiferentes){
      this.camposVacios = false;
      this.terminosAceptados = true;
      return;
    }

    if(this.formularioRegistro.get("terminos")?.value){

      const userDTO: UserDTO = new UserDTO();
      userDTO.nombre = this.formularioRegistro.get("nombre")?.value;
      userDTO.apellido = this.formularioRegistro.get("apellido")?.value;
      userDTO.email = this.formularioRegistro.get("email")?.value;
      userDTO.password = this.formularioRegistro.get("password")?.value;
      userDTO.roles = "USER";

      
      /*let options = {
        headers: new HttpHeaders(),
        responseType: 'text' as 'text',
        withCredentials: true
      };

      this.httpClient.get("http://localhost:3030/todo" , options
        ).subscribe((data) => {
          console.log(data);
          swal(data);
        });*/

        let options = {
          headers: new HttpHeaders(),//.set('Content-Type', 'application/json'),
          withCredentials: true
        };
  
        this.httpClient.post<UserDTO>(BASE_ENDPOINT+"/user/registration", userDTO , options
          ).subscribe((data: UserDTO) => {
            console.log(data);
            swal(data.nombre);
          });

    }
      

  }

  ngOnInit(): void {

  }

}
