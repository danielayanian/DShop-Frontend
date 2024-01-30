import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { customPaginator } from '../custom-paginator-configuration';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  standalone: true,
  imports: [ MatPaginatorModule, ProductCardComponent ],
  //Esto es para personalizar el paginator
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  pageSizeOptions: number[] = [5, 12, 24, 36];

  encabezado: string = '';

  idCategoria: string = '';

  category: Category = new Category(0, '');

  constructor(private http: HttpClient, private productService: ProductService,
    private router: Router, private rutaActiva: ActivatedRoute,
    private categoryService: CategoryService) { 

      rutaActiva.params.subscribe(params => { this.loadCards(); })

    }

  ngOnInit(): void {

    this.loadCards();

  }
  
  loadCards() {
    
    if(this.rutaActiva.snapshot.params['tipo'] === 'inicio'){

      this.productService.listarDestacados(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
        this.encabezado = 'Productos destacados';
      });

    }

    if(this.rutaActiva.snapshot.params['tipo'] === 'ofertas'){

      this.productService.listarOfertas(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
        this.encabezado = 'Ofertas de la semana';
      });
      
    }

    //Para cuando seleccionan una categoria
    if(!isNaN(this.rutaActiva.snapshot.params['tipo'])){

      this.productService.listarProductosDeUnaCategoria(this.pageIndex.toString(), this.pageSize.toString(),
      this.rutaActiva.snapshot.params['tipo']).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;

      });

      this.idCategoria = this.rutaActiva.snapshot.params['tipo'];

      this.categoryService.getCategory(Number(this.idCategoria)).subscribe(data => {
        
        this.category = data;
        this.encabezado = 'Categoría: ' + this.category.nombre;

      });

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

}
