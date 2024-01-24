import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [ ],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent implements OnInit {

  id: number = 0;

  constructor(private rutaActiva: ActivatedRoute){}

  ngOnInit(): void {

    this.id = this.rutaActiva.snapshot.params['id'];
    //Swal.fire(this.id+'');

  }

  comprar(){
    Swal.fire("Hola");
    return false;
  }

}
