import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrito } from '../../models/carrito';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ItemCarrito } from '../../models/itemCarrito';
import { BASE_ENDPOINT } from '../../config/app';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { Purchase } from '../../models/purchase';

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
  stock: number = 0;
  sinStock: boolean = false;

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService,
    private router: Router, private userService: UserService,
    private purchaseService: PurchaseService){}

  ngOnInit(): void {
    
    if(this.rutaActiva.snapshot.params['tipo'] === 'comprar'){

      this.titulo = 'Comprar producto';
      this.idProduct = this.rutaActiva.snapshot.params['id'];
      this.cantidad = Number(this.rutaActiva.snapshot.params['cantidad']);
      this.idUser = Number(sessionStorage.getItem('idUser'));

      const params = new HttpParams()
      .set('id', this.idProduct);
      this.productService.getProduct(BASE_ENDPOINT+'/getProduct', params).subscribe(data => {
        this.product = data;
        this.totalAPagar = data.precio*this.cantidad;
      });

      return;
    }

    if((this.rutaActiva.snapshot.params['tipo'] === 'carrito') ||
       (this.rutaActiva.snapshot.params['tipo'] === 'carrito-reload')){
        
      this.titulo = 'Contenido del carrito';
      this.itemsDelCarrito = Carrito.obtenerItems();
      //Sumar unidades de productos con el mismo id
      let itemsUnificados: ItemCarrito[] = [];
      let i = 0;
      let agregar: boolean = true;

      for(const item of this.itemsDelCarrito){
        i = 0;
        for(const itemUnif of itemsUnificados){
          if(item.product.id === itemUnif.product.id){
            agregar = false;
            break
          }else{
            agregar = true;
            i++;
          }
        }
        if(agregar){
          itemsUnificados.push(new ItemCarrito(item.product, item.cantidad));
        }else{
          itemsUnificados[i].cantidad = itemsUnificados[i].cantidad + item.cantidad;
        }
      }

      this.itemsDelCarrito = itemsUnificados;
      Carrito.items = itemsUnificados;
      this.calcularTotalAPagar();
      return;

    }

  }

  precioAPrecioConPuntos(precio: number){
    return precio.toLocaleString('de-DE');
  }

  pagar(origen: string) {

    let options = {
      withCredentials: true
    };
    this.userService.getUser(BASE_ENDPOINT+"/api/user/single", options)
          .subscribe({
            next: (data: User) => {
              this.idUser = data.id;
              this.pagarLogueado(origen);
            },
            error: () => {
              sessionStorage.setItem('userLogueado', 'false');
              Swal.fire({
                icon: "error",
                title: "Antes de poder comprar debe loguearse",
                showConfirmButton: false,
                timer: 3000,
                background: "#ffffff"
              });
              return;
            }
          });

  }

  pagarLogueado(origen: string){

    let total = this.precioAPrecioConPuntos(this.totalAPagar);
    if(origen === 'carrito'){
      this.sinStock = false;
      let j: number = 0;
      for(const item of this.itemsDelCarrito){
        const params = new HttpParams()
        .set('id', item.product.id);
        this.productService.getProduct(BASE_ENDPOINT+'/getProduct', params).subscribe((data: Product) => {
          j++;
          if(Number(data.stock) < Number(item.cantidad)){
            this.sinStock = true;
          }
          if(this.itemsDelCarrito.length === j){

            if(this.sinStock){
              Swal.fire({
                icon: "error",
                title: "No hay stock suficiente de algún producto!!!",
                showConfirmButton: false,
                timer: 3000,
                background: "#ffffff"
              });
            }else{
              for(const item of this.itemsDelCarrito){
                const params = new HttpParams()
                .set('id', item.product.id);
                this.productService.getProduct(BASE_ENDPOINT+'/getProduct', params).subscribe(data => {
      
                  this.stock = Number(data.stock) - Number(item.cantidad);
                  item.product.stock = this.stock;
      
                  let options = {
                    headers: new HttpHeaders().set('Content-Type', 'application/json'),
                    responseType: 'text' as 'text',
                    withCredentials: true
                  };
                  this.productService.updateProduct(BASE_ENDPOINT+'/updateProduct', item.product, options).subscribe();
      
                  let options2 = {
                    headers: new HttpHeaders().set('Content-Type', 'application/json'),
                    responseType: 'text' as 'text',
                    withCredentials: true
                  };
                  //Agregar compra
                  let purchase = new Purchase(0, this.idUser, item.product.id, '', item.cantidad,
                    item.product.precio, item.product);
                  this.purchaseService.agregarCompraDeUnUsuario(BASE_ENDPOINT+'/addPurchase', purchase, options2).subscribe();
                  
                });
      
              }

              this.router.navigate(['pay/carrito/'+total]);
      
            }
          }
        });
      }

    }else{

      this.product.stock = Number(this.product.stock) - Number(this.cantidad);
      if(Number(this.product.stock) < 0){
        Swal.fire({
          icon: "error",
          title: "No hay stock suficiente!!!",
          showConfirmButton: false,
          timer: 3000,
          background: "#ffffff"
        });
      }else{
        let options: any = {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          responseType: 'text' as 'text',
          withCredentials: true
        };

        this.productService.updateProduct(BASE_ENDPOINT+'/updateProduct', this.product, options).subscribe();
      
        //Agregar compra aca
        let options2: any = {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          responseType: 'text' as 'text',
          withCredentials: true
        };
        let purchase = new Purchase(0, this.idUser, this.product.id, '', this.cantidad,
                      this.product.precio, this.product);
        this.purchaseService.agregarCompraDeUnUsuario(BASE_ENDPOINT+'/addPurchase', purchase, options2).subscribe();
        this.router.navigate(['pay/compra/'+total]);
      }
    }
  }

  eliminarItem(pos : number){

    this.cantidad = 0;
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
