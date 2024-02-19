import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService,
    private router: Router){}

  ngOnInit(): void {
    
    if(this.rutaActiva.snapshot.params['tipo'] === 'comprar'){

      this.titulo = 'Comprar producto';

      //Hacer aca lo que hay que hacer cuando aprieten comprar en una publicacion

      this.idProduct = this.rutaActiva.snapshot.params['id'];
      this.cantidad = Number(this.rutaActiva.snapshot.params['cantidad']);
      this.idUser = Number(sessionStorage.getItem('idUser'));

      this.productService.getProduct(this.idProduct).subscribe(data => {
      
        this.product = data;

        this.totalAPagar = data.precio*this.cantidad;
        
      });

      
      return;
    }

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

  pagar(origen: string){
    
    let total = this.precioAPrecioConPuntos(this.totalAPagar);

    if(origen === 'carrito'){

      Swal.fire("En comprar version carrito, antes de hacer navigate a pay, verificar si está logueado");

      this.router.navigate(['pay/carrito/'+total]);

    }else{

      this.router.navigate(['pay/compra/'+total]);

    }    

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
