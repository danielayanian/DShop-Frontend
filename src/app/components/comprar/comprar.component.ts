import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Carrito } from '../../models/carrito';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [],
  templateUrl: './comprar.component.html',
  styleUrl: './comprar.component.css'
})
export class ComprarComponent implements OnInit {

  id: number = 0;
  cantidad: number = 0;

  constructor(private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {
    
    if(this.rutaActiva.snapshot.params['tipo'] === 'comprar'){

      //Hacer aca lo que hay que hacer cuando aprieten comprar en una publicacion

      this.id = this.rutaActiva.snapshot.params['id'];
      this.cantidad = this.rutaActiva.snapshot.params['cantidad'];

      
      return;
    }

    //if(this.rutaActiva.snapshot.params['tipo'] === 'carrito'){

    if((this.rutaActiva.snapshot.params['tipo'] === 'carrito') ||
       (this.rutaActiva.snapshot.params['tipo'] === 'carrito-reload')){
      
      //Hacer aca lo que haria cuando presionen el carrito

      let res: string = '';

      for(let item of Carrito.obtenerItems()){

        res = res + item.id+'' + ' ' + item.cantidad + ' ';

      }

      Swal.fire(res);


      return;
    }

  }

}
