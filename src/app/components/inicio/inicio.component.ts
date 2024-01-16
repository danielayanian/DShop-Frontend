import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { customPaginator } from '../custom-paginator-configuration';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  standalone: true,
  imports: [ MatPaginatorModule, ProductCardComponent ],
  //Esto es para personalizar el paginator
  providers: [
    { provide: MatPaginatorIntl, useValue: customPaginator() }
  ]
})
export class InicioComponent implements OnInit {

  products: Product[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;
  pageSizeOptions: number[] = [5, 12, 24, 36];

  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {

    this.loadCards();    

  }
  
  loadCards() {
    
    this.productService.listarPaginas(this.pageIndex.toString(), this.pageSize.toString()).subscribe(data => {
      this.products = data.content;
      this.totalItems = data.totalElements;
    });
    
  }

  onPageChange(event: any) {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCards();

  }

}
