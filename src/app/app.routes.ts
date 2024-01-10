import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
    /*{path:"", pathMatch: 'full', redirectTo: 'inicio'},
    path:"inicio", component:AppComponent},*/
    {path:"crear-cuenta", component:CrearCuentaComponent},
    {path:"login", component:LoginComponent},
    {path:"logout", component:InicioComponent},
    {path:"inicio/:nombre", component:InicioComponent}
];
