import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { customPaginator } from '../custom-paginator-configuration';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import Swal from 'sweetalert2';
import { Observable, map, of } from 'rxjs';
import swal from 'sweetalert';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  standalone: true,
  imports: [ MatPaginatorModule, ProductCardComponent, ReactiveFormsModule ],
  //Esto es para personalizar el paginator
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  //productsBackUp: Product[] = [];
  pageSize = 6;
  pageIndex = 0;
  totalItems = 0;
  pageSizeOptions: number[] = [6, 12, 24, 36];

  encabezado: string = '';

  //idCategoria: string = '';

  category: Category = new Category(0, '');

  public formularioListProducts: FormGroup<any>;

  @ViewChild('closebutton') closebutton: any;

  constructor(private http: HttpClient, private productService: ProductService,
    private router: Router, private rutaActiva: ActivatedRoute,
    private categoryService: CategoryService, private fb: FormBuilder) { 

      rutaActiva.params.subscribe(params => { 
        this.pageIndex = 0; this.totalItems = 0;
        this.loadCards(); 
      });//this.pageIndex = 0; this.totalItems = 0;

      this.formularioListProducts = new FormGroup({
        precioModal: new FormControl("", Validators.required)
      });

    }

  ngOnInit(): void {

    this.loadCards();

  }
  

  loadCards() {

    /*if(sessionStorage.getItem('filterState') === 'active'){

      let precio = this.formularioListProducts.get("precioModal")?.value;

      let tipo = sessionStorage.getItem('tipo')!;

      this.productService.listarProductosPorPrecioMaximo(this.pageIndex.toString(), this.pageSize.toString(),
      precio, tipo).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
      });

      this.closebutton.nativeElement.click();

    }else{*/


      if((this.rutaActiva.snapshot.params['tipo'] === 'inicio') ||
      (this.rutaActiva.snapshot.params['tipo'] === 'inicio-reload')){

    

        this.productService.listarDestacados(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Productos destacados';
        });

      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'ofertas')||
      (this.rutaActiva.snapshot.params['tipo'] === 'ofertas-reload')){

    

        this.productService.listarOfertas(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Ofertas de la semana';
        });
        

      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'busqueda') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'busqueda-reload')){

        let palabras = sessionStorage.getItem('palabras')!;

        //Cambiar esto por el endpoint de busqueda, y pasarle las palabras
        this.productService.listarDestacados(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Resultados búsqueda';
        });

        
      }

      //Para cuando seleccionan una categoria
      //if((!isNaN(this.rutaActiva.snapshot.params['tipo']))||
      if((!isNaN(this.rutaActiva.snapshot.params['tipo']))||
      (this.rutaActiva.snapshot.params['tipo'] === 'cat-reload')){

        let idCategNum: number = Number(sessionStorage.getItem("idCateg"));

        this.productService.listarProductosDeUnaCategoria(this.pageIndex.toString(), this.pageSize.toString(),
        idCategNum).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;

        });

        this.categoryService.getCategory(idCategNum).subscribe(data => {
          
          this.category = data;
          this.encabezado = 'Categoría: ' + this.category.nombre;

        });

    }




    ////Seguir aca con los filtros, uno por cada tipo

    if((this.rutaActiva.snapshot.params['tipo'] === 'DestacadosFilter') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'DestacadosFilter-reload')){

        let precio = this.formularioListProducts.get("precioModal")?.value;
        
        Swal.fire(precio);

        this.productService.listarProductosDestPorPrecio(this.pageIndex.toString(), this.pageSize.toString(),
        Number(precio)).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Resultados búsqueda';
        });

        this.closebutton.nativeElement.click();
        
      }







  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCards();

  }

  openPublication(id: number){

    this.router.navigate(['publication/' + id]);
    return false;

  }

  precioAPrecioConPuntos(precio: number){
    return precio.toLocaleString('es');
  }

  filtrar(){

    if(this.router.url != '/products-list/DestacadosFilter'){
      this.router.navigate(['products-list/DestacadosFilter']);
    }else{
      this.router.navigate(['products-list/DestacadosFilter-reload']);
    }

    /*sessionStorage.setItem('filterState', 'active');

    this.pageIndex = 0;

    this.loadCards();*/

  

    //this.products = this.productsBackUp.filter((product) => product.precio <= precio);




    //Seguir por aca. Al buscar en ofertas por precio 100.000 me muestra solo 6 articulos en
    //vez de 10


    //this.pageIndex = 0; this.totalItems = this.products.length;

    

  }

}
