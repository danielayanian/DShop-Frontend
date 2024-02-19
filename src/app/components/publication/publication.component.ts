import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Carrito } from '../../models/carrito';

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

  campoVacio: boolean = false;
  cantidadIncorrecta: boolean = false;
  cantidadCero: boolean = false;

  constructor(private rutaActiva: ActivatedRoute, private productService: ProductService,
    private router: Router, private formBuilder: FormBuilder){

      this.formularioPublicacion = formBuilder.group({
        cantidad: ['']
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
    
    //Swal.fire("En la publicacion, antes de hacer navigate a comprar o a pagar???, verificar si está logueado");

    this.campoVacio = false;
    this.cantidadIncorrecta = false;
    this.cantidadCero = false;

    this.cantidad = this.formularioPublicacion.get("cantidad")?.value;
  
    if(String(this.cantidad) === ""){
        this.campoVacio = true;
        return;
    }else{
      this.campoVacio = false;
    }

    if(String(this.cantidad).match("^[0-9]+$") === null){
      this.cantidadIncorrecta = true;
      return;
    }

    if(Number(this.cantidad) === 0){
      this.cantidadCero = true;
      return;
    }

    window.scroll(0, 0);

    this.router.navigate(['comprar/comprar/' + this.id + '/' + this.cantidad]);

    return false;
  }

  agregarAlCarrito(){

    this.campoVacio = false;
    this.cantidadIncorrecta = false;
    this.cantidadCero = false;

    this.cantidad = this.formularioPublicacion.get("cantidad")?.value;
  
    if(String(this.cantidad) === ""){
        this.campoVacio = true;
        return;
    }else{
      this.campoVacio = false;
    }

    if(String(this.cantidad).match("^[0-9]+$") === null){
      this.cantidadIncorrecta = true;
      return;
    }

    if(Number(this.cantidad) === 0){
      this.cantidadCero = true;
      return;
    }

    //Agregar producto al carrito y su cantidad
    Carrito.agregarItem(this.product, Number(this.cantidad));

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
