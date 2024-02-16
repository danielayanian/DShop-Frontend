import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/userDTO';
import { BASE_ENDPOINT } from '../../config/app';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {

  public formularioEditarPerfil: FormGroup<any>;

  constructor(private router: Router, private userService: UserService){

    this.formularioEditarPerfil = new FormGroup({
      nombre: new FormControl("", Validators.required),
      apellido: new FormControl("", Validators.required),
      dni: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      direccion: new FormControl("", Validators.required),
      telefono: new FormControl("", Validators.required)
    });

  }

  guardar(){

    let userDTO: UserDTO = new UserDTO();

    let options = {
      withCredentials: true
    };

    this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options)
          .subscribe(
            (data: UserDTO) => {

              userDTO.id = data.id;
              userDTO.password = data.password;
              userDTO.roles = data.roles;
              userDTO.nombre = this.formularioEditarPerfil.controls['nombre'].value;
              userDTO.apellido = this.formularioEditarPerfil.controls['apellido'].value;
              userDTO.dni = this.formularioEditarPerfil.controls['dni'].value;
              userDTO.email = this.formularioEditarPerfil.controls['email'].value;
              userDTO.direccion = this.formularioEditarPerfil.controls['direccion'].value;
              userDTO.telefono = this.formularioEditarPerfil.controls['telefono'].value;

              let options2 = {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                responseType: 'text' as 'text',
                withCredentials: true
              };
          
              this.userService.updateUser(BASE_ENDPOINT+"/updateUser", userDTO , options2)
              .subscribe((data) => {
          
                Swal.fire({
                  icon: "success",
                  title: "Cambios guardados exitosamente!!!",
                  showConfirmButton: false,
                  timer: 3000,
                  background: "#ffffff"
                });
            
                this.router.navigate(['perfil']);
          
              });


            }
          );
    
  }

  cancelar(){
    
    this.router.navigate(['perfil']);

  }


  ngAfterViewInit(): void {
    //Set focus to the firstName field
    //this.myInput.nativeElement.focus();
    window.scroll(0, 0);
  }

  ngOnInit(): void {

    let options = {
      withCredentials: true
    };

    this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options)
          .subscribe(
            (data: UserDTO) => {

              this.formularioEditarPerfil.controls['nombre'].setValue(data.nombre);
              this.formularioEditarPerfil.controls['apellido'].setValue(data.apellido);
              this.formularioEditarPerfil.controls['dni'].setValue(data.dni);
              this.formularioEditarPerfil.controls['email'].setValue(data.email);
              this.formularioEditarPerfil.controls['direccion'].setValue(data.direccion);
              this.formularioEditarPerfil.controls['telefono'].setValue(data.telefono);

            }
          );

    

  }

}
