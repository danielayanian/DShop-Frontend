import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { BASE_ENDPOINT } from '../../config/app';
import { HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  categorias: Category[] = [];

  constructor(public cookieService: CookieService, private userService: UserService,
    private productService: ProductService, private categoryService: CategoryService){
    
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

    this.categoryService.getCategories()
    .subscribe(
      (data) => {

          this.categorias = data;
        
      }
    );

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



