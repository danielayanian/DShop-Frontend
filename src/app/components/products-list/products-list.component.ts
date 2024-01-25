import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { customPaginator } from '../custom-paginator-configuration';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient, private productService: ProductService,
    private router: Router, private rutaActiva: ActivatedRoute) { 

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
      });

    }

    if(this.rutaActiva.snapshot.params['tipo'] === 'ofertas'){

      this.productService.listarOfertas(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
      });
      
    }

    if(this.rutaActiva.snapshot.params['tipo'] === 'televisores'){

      this.productService.listarTelevisores(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
      });
      
    }

    if(this.rutaActiva.snapshot.params['tipo'] === 'celulares'){

      this.productService.listarCelulares(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
      });
      
    }

    if(this.rutaActiva.snapshot.params['tipo'] === 'notebooks'){

      this.productService.listarNotebooks(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
        this.products = data.content;
        this.totalItems = data.totalElements;
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
