import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  public formularioEditarPerfil: FormGroup<any>;

  constructor(private router: Router){

    this.formularioEditarPerfil = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      recordarme: new FormControl("")
    });

  }

  guardar(){

  }

  cancelar(){
    
    this.router.navigate(['perfil']);

  }


  ngAfterViewInit(): void {
    //Set focus to the firstName field
    //this.myInput.nativeElement.focus();
    window.scroll(0, 0);
  }

}
