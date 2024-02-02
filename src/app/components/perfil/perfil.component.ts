import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BASE_ENDPOINT } from '../../config/app';
import { UserDTO } from '../../models/userDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  email: string = '';
  direccion: string = '';
  telefono: string = '';

  constructor(private userService: UserService){}

  ngOnInit(): void {
    
    let options = {
      withCredentials: true
    };

    this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options)
          .subscribe(
            (data: UserDTO) => {

              this.nombre = data.nombre;
              this.apellido = data.apellido;
              this.dni = data.dni;
              this.email = data.email;
              this.direccion = data.direccion;
              this.telefono = data.telefono;

            }
          );

  }

  editarPerfil(){

  }

}
