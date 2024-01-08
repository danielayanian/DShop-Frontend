import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  public nombre: any;

  constructor(private _route: ActivatedRoute){
  
    this.nombre = String(this._route.snapshot.paramMap.get('nombre'));

  }

}
