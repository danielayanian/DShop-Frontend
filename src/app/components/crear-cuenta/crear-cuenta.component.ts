import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import {HttpHeaders } from '@angular/common/http';
import { UserDTO } from '../../models/userDTO';
import { BASE_ENDPOINT } from '../../config/app';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

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
  public nombreIncorrecto = false;
  public apellidoIncorrecto = false;
  public emailIncorrecto = false;
  public passwordIncorrecto = false;
  public passwordRepetidoIncorrecto = false;
  public formularioRegistro: FormGroup<any>;

  constructor(private router: Router, private userService: UserService){

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

    this.terminosAceptados = true;
    this.passwordDiferentes = false;
    this.camposVacios = false;
    this.nombreIncorrecto = false;
    this.apellidoIncorrecto = false;
    this.emailIncorrecto = false;
    this.passwordIncorrecto = false;
    this.passwordRepetidoIncorrecto = false;

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

    let nombre = this.formularioRegistro.get("nombre")?.value;
    if(nombre.match("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") === null){
      this.nombreIncorrecto = true;
      return;
    }

    let apellido = this.formularioRegistro.get("apellido")?.value;
    if(apellido.match("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$") === null){
      this.apellidoIncorrecto = true;
      return;
    }

    let email = this.formularioRegistro.get("email")?.value;
    if(email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/) === null){
      this.emailIncorrecto = true;
      return;
    }

    let password = this.formularioRegistro.get("password")?.value;
    if(password.match(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/) === null){
      this.passwordIncorrecto = true;
      return;
    }

    let passwordRepetido = this.formularioRegistro.get("repitaPassword")?.value;
    if(passwordRepetido.match(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/) === null){
      this.passwordRepetidoIncorrecto = true;
      return;
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

      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        withCredentials: true
      };

      this.userService.postRegist(BASE_ENDPOINT+"/api/user/registration", userDTO , options)
      .subscribe((data: UserDTO) => {

          if(data.id > 0){
            this.router.navigate(['/login']);
            Swal.fire({
              icon: "success",
              title: "Registro exitoso!!!",
              showConfirmButton: false,
              timer: 3000
            });
          }

          if(data.id === -33){
            Swal.fire({
              icon: "error",
              title: "El email ingresado ya se encontraba registrado. Ingrese otro, o loguéese!!!",
              showConfirmButton: true,
              timer: 3000
            });
          }

          if(data.id === -32){
          Swal.fire({
              icon: "error",
              title: "Un error ha ocurrido. Intente registrarse de nuevo!!!",
              showConfirmButton: false,
              timer: 3000
            });
          }

      });

    }
      
  }

  ngOnInit(): void {}

}
