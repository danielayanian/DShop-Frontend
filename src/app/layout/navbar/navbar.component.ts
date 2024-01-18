import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';
import { UserService } from '../../services/user.service';
import { BASE_ENDPOINT } from '../../config/app';
import { UserDTO } from '../../models/userDTO';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public cookieService: CookieService, private userService: UserService){
    
    if((this.userLogueado() != 'false') &&
    (this.userLogueado() != 'true')){
      
      sessionStorage.setItem('userLogueado', 'false');

      sessionStorage.removeItem('userNombre');
      sessionStorage.removeItem('roles');
    
    }
    
  }

  public userLogueado() {
    return sessionStorage.getItem('userLogueado');
  }

  public userNombre(){
    return sessionStorage.getItem('userNombre');
  }

  public buscar(){

  }

  ngOnInit(): void {

  }

  public logout(): void{

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),//sacar
      responseType: 'text' as 'text',
      withCredentials: true
    };

    this.userService.logout(BASE_ENDPOINT+"/logout", options)
    .subscribe(
      (data) => {

        sessionStorage.setItem('userLogueado', 'false');
        sessionStorage.removeItem('userNombre');
        
      }
    );

  }

  public getRolOfUser(){

    return sessionStorage.getItem('roles');

  }
    
}



