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

  public formularioRegistro: FormGroup<any>;

  constructor(private httpClient: HttpClient){

    this.formularioRegistro = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      repitaPassword: new FormControl("", Validators.required),
      terminos: new FormControl("")
    });



  }

  public registrarUsuario(){

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');


    const userDTO: UserDTO = new UserDTO();
    userDTO.nombre = this.formularioRegistro.get("nombre")?.value;
    userDTO.email = this.formularioRegistro.get("email")?.value;
    userDTO.password = this.formularioRegistro.get("password")?.value;
    userDTO.repitaPassword = this.formularioRegistro.get("repitaPassword")?.value;

    this.httpClient.post<UserDTO>(BASE_ENDPOINT+"/registro", JSON.stringify(userDTO),
     { headers: headers } ).subscribe((data: UserDTO) => {
        console.log(data);
      });

      if(this.formularioRegistro.get("terminos")?.value){
        swal("TRUE");
      }else{
        swal("FALSE");
      }
      

  }

  ngOnInit(): void {

  }

}
