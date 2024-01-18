import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PublicationComponent } from './components/publication/publication.component';

export const routes: Routes = [
    {path:"", pathMatch: 'full', redirectTo: 'products-list'},
    {path:"products-list", component:ProductsListComponent},
    {path:"crear-cuenta", component:CrearCuentaComponent},
    {path:"login", component:LoginComponent},
    {path:"logout", redirectTo: 'products-list/inicio'},
    {path:"products-list/:inicio", component:ProductsListComponent},
    {path:"products-list/:ofertas", component:ProductsListComponent},
    {path:"products-list/:televisores", component:ProductsListComponent},
    {path:"products-list/:celulares", component:ProductsListComponent},
    {path:"products-list/:notebooks", component:ProductsListComponent},
    {path:"publication/:id", component:PublicationComponent}
];
