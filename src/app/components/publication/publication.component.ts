import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrito } from '../../models/carrito';
import { ItemCarrito } from '../../models/itemCarrito';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent implements OnInit {

  id: number = 0;

  cantidad: number = 0;

  product: Product = new Product(0, "", "", "", 0, 0, 0);

  public formularioPublicacion: FormGroup<any>;

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService,
    private router: Router, private fb: FormBuilder){

      this.formularioPublicacion = new FormGroup({
        cantidad: new FormControl("", Validators.required)
      });

      this.formularioPublicacion.controls['cantidad'].setValue(1);
      this.cantidad = 1;

    }

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
    
    Swal.fire("En la publicacion, antes de hacer navigate a comprar, verificar si está logueado");


    window.scroll(0, 0);

      this.cantidad = this.formularioPublicacion.get("cantidad")?.value;

      this.router.navigate(['comprar/comprar/' + this.id + '/' + this.cantidad]);

        /*this.productService.listarDestacados().subscribe(data => {
          this.products = data.content;
          this.totalItems = data.totalElements;
          this.encabezado = 'Productos destacados';
        });*/

      

    return false;
  }

  agregarAlCarrito(){

    this.cantidad = this.formularioPublicacion.get("cantidad")?.value;

    //Agregar producto al carrito y su cantidad
    Carrito.agregarItem(this.product, this.cantidad);

    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito exitosamente!!!",
      showConfirmButton: false,
      timer: 3000,
      background: "#ffffff"
    });

  }

  precioAPrecioConPuntos(precio: number){
    return precio.toLocaleString('de-DE');
  }

}
