import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
    /*{path:"", pathMatch: 'full', redirectTo: 'inicio'},
    path:"inicio", component:AppComponent},*/
    {path:"crear-cuenta", component:CrearCuentaComponent},
    {path:"login", component:LoginComponent}
];
