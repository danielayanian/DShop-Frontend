import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { BASE_ENDPOINT } from '../../config/app';
import { HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchAll } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  categorias: Category[] = [];

  public formularioBusqueda: FormGroup<any>;

  constructor(private router: Router, public cookieService: CookieService, private userService: UserService,
    private productService: ProductService, private categoryService: CategoryService){
    
    if((this.userLogueado() != 'false') &&
    (this.userLogueado() != 'true')){
      
      sessionStorage.setItem('userLogueado', 'false');

      sessionStorage.removeItem('userNombre');
      sessionStorage.removeItem('roles');
    
    }

    this.formularioBusqueda = new FormGroup({
      busqueda: new FormControl("", Validators.required)
    });
    
  }
  
  public userLogueado() {
    return sessionStorage.getItem('userLogueado');
  }

  public userNombre(){
    return sessionStorage.getItem('userNombre');
  }

  public buscar(){

    let palabras = this.formularioBusqueda.get("busqueda")?.value;
    
    sessionStorage.setItem('palabras', palabras);

    if(this.router.url != '/products-list/search'){
      this.router.navigate(['products-list/search']);
    }else{
      this.router.navigate(['products-list/search-reload']);
    }

  }

  public inicio(){

    if(this.router.url != '/products-list/inicio'){
      this.router.navigate(['products-list/inicio']);
    }else{
      this.router.navigate(['products-list/inicio-reload']);
    }

  }

  public ofertas(){

    if(this.router.url != '/products-list/ofertas'){
      this.router.navigate(['products-list/ofertas']);
    }else{
      this.router.navigate(['products-list/ofertas-reload']);
    }

  }

  public categ(idCateg: number){

    sessionStorage.setItem("idCateg", idCateg+'');

    if(this.router.url != '/products-list/categ'){
      this.router.navigate(['products-list/categ']);
    }else{
      this.router.navigate(['products-list/categ-reload']);
    }

  }

  public carrito(){

    if(this.router.url != '/comprar/carrito'){
      this.router.navigate(['comprar/carrito']);
    }else{
      this.router.navigate(['comprar/carrito-reload']);
    }

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



