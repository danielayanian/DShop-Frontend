import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { customPaginator } from '../../config/custom-paginator-configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  standalone: true,
  imports: [ MatPaginatorModule, ReactiveFormsModule ],
  //Esto es para personalizar el paginator
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  pageSize = 6;
  pageIndex = 0;
  totalItems = 0;
  pageSizeOptions: number[] = [6, 12, 24, 36];
  encabezado: string = '';
  precioMax: string = '';
  category: Category = new Category(0, '');

  public formularioListProducts: FormGroup<any>;

  @ViewChild('closebutton') closebutton: any;

  constructor(private http: HttpClient, private productService: ProductService,
    private router: Router, private rutaActiva: ActivatedRoute,
    private categoryService: CategoryService, private fb: FormBuilder) { 

      rutaActiva.params.subscribe(params => { 
        this.pageIndex = 0; this.totalItems = 0;
        this.loadCards(); 
      });

      this.formularioListProducts = new FormGroup({
        precioModal: new FormControl("", Validators.required)
      });

    }

  ngOnInit(): void {

    sessionStorage.setItem('rutaActual', this.rutaActiva.snapshot.params['tipo']);

    this.loadCards();

  }
  

  loadCards() {

    this.precioMax = '';

    window.scroll(0, 0);

      if((this.rutaActiva.snapshot.params['tipo'] === 'inicio') ||
      (this.rutaActiva.snapshot.params['tipo'] === 'inicio-reload')){

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString());

        this.productService.listarDestacados(BASE_ENDPOINT+'/listarDestacados', params ).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Productos destacados';
        });

      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'ofertas')||
      (this.rutaActiva.snapshot.params['tipo'] === 'ofertas-reload')){

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString());

        this.productService.listarOfertas(BASE_ENDPOINT+'/listarOfertas', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;

          this.encabezado = 'Ofertas de la semana';
        });
        
      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'search') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'search-reload')){

        let palabras: string = sessionStorage.getItem('palabras')!;

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('palabras', palabras);

        this.productService.listarBusqueda(BASE_ENDPOINT+'/listarBusqueda', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;

          this.encabezado = 'Resultados búsqueda';
        });

      }

      //Para cuando seleccionan una categoria
      if((this.rutaActiva.snapshot.params['tipo'] === 'categ') ||
         (this.rutaActiva.snapshot.params['tipo'] === 'categ-reload')){

        let idCategNum: number = Number(sessionStorage.getItem("idCateg"));

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('idCategoria', Number(idCategNum));

        this.productService.listarProductosDeUnaCategoria(BASE_ENDPOINT+'/listarProductosDeUnaCategoria', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;

        });

        const params2 = new HttpParams()
        .set('id', idCategNum);

        this.categoryService.getCategory(BASE_ENDPOINT+'/getCategory', params2).subscribe(data => {
          
          this.category = data;
          this.encabezado = 'Categoría: ' + this.category.nombre;

        });

    }

    //Aca los filtros, uno por cada tipo

    if((this.rutaActiva.snapshot.params['tipo'] === 'inicioFilter') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'inicioFilter-reload')){

        let precio = this.formularioListProducts.get("precioModal")?.value;

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('precio', Number(precio));

        this.productService.listarProductosDestPorPrecio(BASE_ENDPOINT+'/filtrarDestPorPrecio', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.precioMax = '(Precio <= $' + this.precioAPrecioConPuntos(Number(precio)) + ')';
        });

        this.closebutton.nativeElement.click();
        
      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'ofertasFilter') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'ofertasFilter-reload')){

        let precio = this.formularioListProducts.get("precioModal")?.value;
        
        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('precio', Number(precio));

        this.productService.listarProductosOfertasPorPrecio(BASE_ENDPOINT+'/filtrarOfertasPorPrecio', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.precioMax = '(Precio <= $' + this.precioAPrecioConPuntos(Number(precio)) + ')';
        });

        this.closebutton.nativeElement.click();
        
      }

      if((this.rutaActiva.snapshot.params['tipo'] === 'categFilter') ||
         (this.rutaActiva.snapshot.params['tipo'] === 'categFilter-reload')){

        let idCategNum: number = Number(sessionStorage.getItem("idCateg"));

        let precio = this.formularioListProducts.get("precioModal")?.value;

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('precio', Number(precio))
        .set('idCategoria', idCategNum);

        this.productService.listarProductosDeUnaCategPorPrecio(BASE_ENDPOINT+'/filtrarCategPorPrecio', params).subscribe(data => {

          this.products = data.content;
          this.totalItems = data.totalElements;
          this.precioMax = '(Precio <= $' + this.precioAPrecioConPuntos(Number(precio)) + ')';

        });

        this.closebutton.nativeElement.click();

    }

    if((this.rutaActiva.snapshot.params['tipo'] === 'searchFilter') ||
        (this.rutaActiva.snapshot.params['tipo'] === 'searchFilter-reload')){

        let palabras = sessionStorage.getItem('palabras')!;
        let precio = this.formularioListProducts.get("precioModal")?.value;

        const params = new HttpParams()
        .set('page', this.pageIndex.toString())
        .set('size', this.pageSize.toString())
        .set('palabras', palabras)
        .set('precio', Number(precio));

        this.productService.listarBusquedaPorPrecio(BASE_ENDPOINT+'/filtrarBusquedaPorPrecio', params).subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.precioMax = '(Precio <= $' + this.precioAPrecioConPuntos(Number(precio)) + ')';
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
    return precio.toLocaleString('de-DE');
  }

  filtrar(){

    let precio = String(this.formularioListProducts.get("precioModal")?.value);

    if(precio.match("^[0-9]+$") === null){
      Swal.fire({
        icon: "error",
        title: "Debe ingresar un número",
        showConfirmButton: false,
        timer: 3000,
        background: "#ffffff"
      });
      return;
    }

    if((this.router.url === '/products-list/inicioFilter') ||
       (this.router.url === '/products-list/inicioFilter-reload') ||
       (this.router.url === '/products-list/inicio') ||
       (this.router.url === '/products-list/inicio-reload')){

        if(this.router.url != '/products-list/inicioFilter'){
          this.router.navigate(['products-list/inicioFilter']);
        }else{
          this.router.navigate(['products-list/inicioFilter-reload']);
        }

    }

    if((this.router.url === '/products-list/ofertasFilter') ||
       (this.router.url === '/products-list/ofertasFilter-reload') ||
       (this.router.url === '/products-list/ofertas') ||
       (this.router.url === '/products-list/ofertas-reload')){

        if(this.router.url != '/products-list/ofertasFilter'){
          this.router.navigate(['products-list/ofertasFilter']);
        }else{
          this.router.navigate(['products-list/ofertasFilter-reload']);
        }

    }

    if((this.router.url === '/products-list/categFilter') ||
       (this.router.url === '/products-list/categFilter-reload') ||
       (this.router.url === '/products-list/categ') ||
       (this.router.url === '/products-list/categ-reload')){

        if(this.router.url != '/products-list/categFilter'){
          this.router.navigate(['products-list/categFilter']);
        }else{
          this.router.navigate(['products-list/categFilter-reload']);
        }

    }

    if((this.router.url === '/products-list/searchFilter') ||
       (this.router.url === '/products-list/searchFilter-reload') ||
       (this.router.url === '/products-list/search') ||
       (this.router.url === '/products-list/search-reload')){

        if(this.router.url != '/products-list/searchFilter'){
          this.router.navigate(['products-list/searchFilter']);
        }else{
          this.router.navigate(['products-list/searchFilter-reload']);
        }

    }

  }

}
