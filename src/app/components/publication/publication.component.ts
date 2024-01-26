import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [ ],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent implements OnInit {

  id: number = 0;
  product: Product = new Product(0, "","","",0);

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {

    this.id = this.rutaActiva.snapshot.params['id'];
    
    this.productService.getProduct(this.id).subscribe(data => {
      
      this.product = data;
      
    });

  }

  ngAfterViewInit(): void {
    window.scroll(0, 0);
  }

  comprar(){
    Swal.fire("Hola");
    return false;
  }

}
