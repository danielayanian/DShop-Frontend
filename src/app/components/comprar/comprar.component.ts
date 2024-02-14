import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrito } from '../../models/carrito';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ItemCarrito } from '../../models/itemCarrito';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.css'
})
export class ComprarComponent implements OnInit {

  idProduct: number = 0;
  cantidad: number = 0;
  idUser: number = 0;
  product: Product = new Product(0, '', '', '', 0, 0, 0);
  itemsDelCarrito: ItemCarrito[] = [];
  titulo: string = '';
  totalAPagar: number = 0;
  posItem : number = -1;

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
    
    if(this.rutaActiva.snapshot.params['tipo'] === 'comprar'){

      this.titulo = 'Comprar producto';

      //Hacer aca lo que hay que hacer cuando aprieten comprar en una publicacion

      this.idProduct = this.rutaActiva.snapshot.params['id'];
      this.cantidad = this.rutaActiva.snapshot.params['cantidad'];
      this.idUser = Number(sessionStorage.getItem('idUser'));

      this.productService.getProduct(this.idProduct).subscribe(data => {
      
        this.product = data;
        
      });

      
      return;
    }

    //if(this.rutaActiva.snapshot.params['tipo'] === 'carrito'){

    if((this.rutaActiva.snapshot.params['tipo'] === 'carrito') ||
       (this.rutaActiva.snapshot.params['tipo'] === 'carrito-reload')){

      this.titulo = 'Contenido del carrito';

      this.itemsDelCarrito = Carrito.obtenerItems();

      this.calcularTotalAPagar();

      return;

    }

  }

  precioAPrecioConPuntos(precio: number){
    return precio.toLocaleString('de-DE');
  }

  pagar(){
    Swal.fire('Pagar');
  }

  eliminarItem(pos : number){

    this.itemsDelCarrito.splice(pos, 1);

    this.calcularTotalAPagar();

  }

  calcularTotalAPagar(){

    this.totalAPagar = 0;

    for(const item of this.itemsDelCarrito){

      this.totalAPagar = this.totalAPagar + (item.cantidad*item.product.precio);

    }

  }

}
