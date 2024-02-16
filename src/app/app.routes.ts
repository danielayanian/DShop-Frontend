import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearCuentaComponent } from './components/crear-cuenta/crear-cuenta.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { PublicationComponent } from './components/publication/publication.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { PayComponent } from './components/pay/pay.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

export const routes: Routes = [
    {path:"", pathMatch: 'full', redirectTo: 'products-list/inicio'},
    {path:"crear-cuenta", component:CrearCuentaComponent},
    {path:"login", component:LoginComponent},
    {path:"logout", redirectTo: 'products-list/inicio'},
    {path:"products-list/:tipo", component:ProductsListComponent},
    {path:"publication/:id", component:PublicationComponent},
    {path:"purchases", component:PurchaseComponent},
    {path:"perfil", component:PerfilComponent},
    {path:"comprar/:tipo/:id/:cantidad", component:ComprarComponent},
    {path:"comprar/:tipo", component:ComprarComponent},
    {path:"pay/:origen/:total", component:PayComponent},
    {path:"editar-perfil", component:EditarPerfilComponent}
];
