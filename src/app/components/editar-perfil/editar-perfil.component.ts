import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
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

    //Validar como en crear cuenta

    let user: User = new User();

    let options = {
      withCredentials: true
    };

    this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options)
          .subscribe(
            (data: User) => {

              user.id = data.id;
              user.nombre = this.formularioEditarPerfil.controls['nombre'].value;
              user.apellido = this.formularioEditarPerfil.controls['apellido'].value;
              user.dni = this.formularioEditarPerfil.controls['dni'].value;
              user.email = this.formularioEditarPerfil.controls['email'].value;
              user.direccion = this.formularioEditarPerfil.controls['direccion'].value;
              user.telefono = this.formularioEditarPerfil.controls['telefono'].value;

              sessionStorage.setItem('userNombre', user.nombre);

              let options2 = {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                responseType: 'text' as 'text',
                withCredentials: true
              };
          
              this.userService.updateUser(BASE_ENDPOINT+"/updateUser", user , options2)
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
            (data: User) => {

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
