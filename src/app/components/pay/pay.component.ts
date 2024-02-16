import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Carrito } from '../../models/carrito';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit {

  total: number = 0;

  constructor(private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {
    
    this.total = this.rutaActiva.snapshot.params['total'];

    if(this.rutaActiva.snapshot.params['origen'] === 'carrito'){

      Carrito.vaciar();

    }

  }

}
