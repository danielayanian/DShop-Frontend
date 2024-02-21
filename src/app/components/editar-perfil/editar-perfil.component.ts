import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  public dniIncorrecto = false;
  public telefonoIncorrecto = false;

  public formularioEditarPerfil: FormGroup<any>;

  constructor(private router: Router, private userService: UserService,
    private formBuilder: FormBuilder){

    this.formularioEditarPerfil = formBuilder.group({
      nombre: [''],
      apellido: [''],
      dni: [''],
      email: [''],
      direccion: [''],
      telefono: ['']
    });

  }

  guardar(){

    this.dniIncorrecto = false;
    this.telefonoIncorrecto = false;

    let dni = this.formularioEditarPerfil.get("dni")?.value;
    if(dni !== null){
      if(dni.match("^[0-9]+$") === null){
        this.dniIncorrecto = true;
        return;
      }
    }
    
    let telefono = this.formularioEditarPerfil.get("telefono")?.value;
    if(telefono !== null){
      if(telefono.match("^[0-9]+$") === null){
        this.telefonoIncorrecto = true;
        return;
      }
    }

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
