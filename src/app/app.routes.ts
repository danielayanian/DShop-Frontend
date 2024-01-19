import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PublicationComponent } from './components/publication/publication.component';

export const routes: Routes = [
    {path:"", pathMatch: 'full', redirectTo: 'products-list/inicio'},
    {path:"crear-cuenta", component:CrearCuentaComponent},
    {path:"login", component:LoginComponent},
    {path:"logout", redirectTo: 'products-list/inicio'},
    {path:"products-list/:tipo", component:ProductsListComponent},
    {path:"publication/:id", component:PublicationComponent}
];
